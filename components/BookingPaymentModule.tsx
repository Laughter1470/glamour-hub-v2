import React, { useMemo, useState, useEffect } from "react";
import { Check, Loader2, X } from "lucide-react";

// ──────────────────────────────────────────────────────────────
// CONFIGURATION CONSTANTS
// ──────────────────────────────────────────────────────────────
// PAYSTACK KEY (REQUIRED for payments)
const PAYSTACK_PUBLIC_KEY = "pk_test_8e2ebc94c2d187baf3c0a77b733f7d2bea3b06cc"; // Your Paystack Test/Live Key

// CALLMEBOT WHATSAPP CONFIG (REQUIRED for WhatsApp receipt)
const WHATSAPP_PHONE_NUMBER = "2347035118531"; // Your registered WhatsApp number
const CALLMEBOT_API_KEY = "7480357";         // Your real, active CallMeBot API Key

// ──────────────────────────────────────────────────────────────
// POLICY TEXT (unchanged)
// ──────────────────────────────────────────────────────────────
const CANCELLATION_POLICY_CONTENT = `
# Cancellation & No-Show Policy

This policy is designed to protect our business, staff, and clients. When you book an appointment with Glamour House, you are reserving time and resources that are specifically allocated for your service.

## 1. Credit Card Guarantee

To confirm and secure your appointment, a valid credit card is required on file. Your card will NOT be charged at the time of booking.

By providing your card information, you authorize Glamour House to enforce the following policies in the event of a late cancellation or no-show.

## 2. Cancellation / Rescheduling Policy

We require a minimum of **24 hours notice** to cancel or reschedule any appointment. This time allows us to offer your reserved slot to clients on our waiting list.

* **Cancellation with 24+ Hours Notice:** No charge will be applied. Your service deposit (if applicable) will be fully refunded or held for a future booking.

* **Cancellation with Less Than 24 Hours Notice:** A cancellation fee equivalent to **50% of the scheduled service price** will be charged to the card on file.

## 3. No-Show Policy

A "no-show" is defined as missing an appointment without providing any prior notice.

* **No-Show Penalty:** Clients who fail to show up for their scheduled appointment will be charged **100% of the scheduled service price** to the card on file.

* **Future Bookings:** Clients with multiple no-shows may be required to pay for future services in full at the time of booking.

## 4. Late Arrival Policy

We understand that delays can happen. However, to respect the time of all our clients and staff, we adhere to a strict schedule:

* **Arrival within 15 Minutes:** We will do our best to accommodate your service, but we may need to shorten the service time to ensure we do not delay the next client. You will be responsible for the full service fee.

* **Arrival Exceeding 15 Minutes:** Your appointment will be considered a **late cancellation** (see Section 2), and we may not be able to accommodate you. The 50% cancellation fee will apply.

We appreciate your understanding and cooperation, which allows us to continue providing the highest quality of service to all our valued clients.
`;

const TERMS_AND_CONDITIONS_CONTENT = `
# General Terms and Conditions

These are the general terms and conditions for using our booking platform and services.

1.  **Service Provision:** All services are provided by certified professionals.
2.  **Liability:** Glamour House is not liable for personal property loss or damage.
3.  **Client Responsibility:** You are responsible for disclosing any allergies or medical conditions before treatment.
4.  **Pricing:** All prices are subject to change without notice, though the price confirmed at booking will be honored.
5.  **Data Usage:** Your personal data will be handled in accordance with our Privacy Policy.
`;

// ──────────────────────────────────────────────────────────────
// TYPES (unchanged)
// ──────────────────────────────────────────────────────────────
type BookingDetails = {
  bookingId?: string;
  serviceName: string;
  totalPrice: number;
  clientEmail: string;
  currency?: string;
};

type BookingPaymentModuleProps = {
  bookingDetails: BookingDetails;
  clientName: string;
  clientPhone: string;
  onBookingConfirmed?: (transactionId: string, amountPaid: number) => void;
};

// ──────────────────────────────────────────────────────────────
// Policy Modal (unchanged)
// ──────────────────────────────────────────────────────────────
type ModalProps = {
  title: string;
  content: string;
  onClose: () => void;
};

const PolicyModal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  const formatContent = (markdown: string): string => {
    let html = markdown
      .replace(/^#\s+(.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 text-[#c39130]">$1</h2>')
      .replace(/^##\s+(.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/^\*\s+(.*$)/gim, '<li class="ml-6 mb-1 text-sm">$1</li>')
      .replace(/^[0-9]+\.\s+(.*$)/gim, '<li class="ml-6 mb-1 text-sm list-decimal">$1</li>')
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");

    const hasOrderedList = markdown.includes("1.");
    const hasUnorderedList = markdown.includes("* ");
    if (hasOrderedList || hasUnorderedList) {
      html = `<${hasOrderedList ? "ol" : "ul"} class="my-4">${html}</${hasOrderedList ? "ol" : "ul"}>`;
    }

    return `<div class="text-sm text-gray-600 leading-relaxed">${html}</div>`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#ffe8a8] p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#c39130]">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────
export default function BookingPaymentModule({
  bookingDetails,
  clientName,
  clientPhone,
  onBookingConfirmed,
}: BookingPaymentModuleProps) {
  const { bookingId, serviceName, totalPrice, clientEmail, currency = "NGN" } = bookingDetails;

  const [selectedDepositOption, setSelectedDepositOption] = useState<number>(25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaystackReady, setIsPaystackReady] = useState(false); // New state to track script loading
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Load Paystack script and track readiness
  useEffect(() => {
    // Check if we are running in the browser and the script hasn't been loaded yet
    if (typeof window === "undefined" || (window as any).PaystackPop) {
      if ((window as any).PaystackPop) {
        setIsPaystackReady(true); // Already loaded (e.g., during fast refresh)
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline-inline.js";
    script.async = true;
    
    // Set ready state when script is loaded
    script.onload = () => {
      setIsPaystackReady(true);
      setPaymentError(null); // Clear any previous errors if it loads successfully on retry
      console.log("Paystack script loaded successfully.");
    };

    // Handle load error
    script.onerror = () => {
        setPaymentError("Failed to load Paystack payment script. Check network connection.");
        setIsPaystackReady(false);
        console.error("Paystack script failed to load.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.contains(script) && document.body.removeChild(script);
    };
  }, []);

  const amountToChargeKobo = useMemo(() => {
    return Math.round(totalPrice * (selectedDepositOption / 100) * 100);
  }, [totalPrice, selectedDepositOption]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);

  const openModal = (type: "terms" | "policy") => {
    if (type === "policy") {
      setModalTitle("Cancellation & No-Show Policy");
      setModalContent(CANCELLATION_POLICY_CONTENT);
    } else {
      setModalTitle("Terms and Conditions");
      setModalContent(TERMS_AND_CONDITIONS_CONTENT);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ───── REAL PAYSTACK + AUTO WHATSAPP RECEIPT ─────
    const handlePayment = async () => {
    if (!isPaystackReady) {
      setPaymentError("Payment gateway still loading. Please wait...");
      return;
    }

    if (!hasAgreedToTerms) {
      setPaymentError("You must agree to the terms and policy.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const paystack = (window as any).PaystackPop;

    paystack.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: clientEmail,
      amount: amountToChargeKobo,
      currency: "NGN",
      ref: `GH_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      metadata: {
        service: serviceName,
        deposit_percent: selectedDepositOption,
        client_name: clientName,
        client_phone: clientPhone,
      },

      callback: async (response: any) => {
        const ref = response.reference;
        const amountPaid = amountToChargeKobo / 100;

        setSuccessMessage("Payment successful! Sending receipt...");
        onBookingConfirmed?.(ref, amountPaid);
        setIsProcessing(false);

        const name = clientName.trim() || "Valued Client";
        const phone = clientPhone.trim() || "Not provided";

        const message = `
*GLAMOUR HUB - OFFICIAL RECEIPT*

Hello *${name}*,

Your payment has been confirmed!

*Customer Details*
• Name: ${name}
• Phone: ${phone}
• Email: ${clientEmail}

*Booking Details*
• Service: ${serviceName}
• Amount Paid: ${formatCurrency(amountPaid)}
${selectedDepositOption < 100
  ? `• Deposit: ${selectedDepositOption}% • Balance Due: ${formatCurrency(totalPrice - amountPaid)} (on arrival)`
  : "• Payment: 100% (Full)"}

*Total Value:* ${formatCurrency(totalPrice)}
*Date:* ${new Date().toLocaleDateString("en-GB")}
*Time:* ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
*Reference:* ${ref}

We're excited to see you soon!

*Location:* Opposite Holy Trinity Church, Maitama, Abuja
*Instagram:* @glamourhub_ng
*Phone:* 0703 511 8531

See you soon, Queen!`.trim();

        try {
          const res = await fetch(
            `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodeURIComponent(message)}&apikey=${CALLMEBOT_API_KEY}`
          );

          if (res.ok) {
            setSuccessMessage("Payment successful! Receipt sent to WhatsApp");
          } else {
            const err = await res.text();
            console.warn("CallMeBot error:", err);
            setSuccessMessage("Payment successful! (WhatsApp failed)");
          }
        } catch (err) {
          console.warn("Network error sending WhatsApp:", err);
          setSuccessMessage("Payment successful! (Could not send receipt)");
        }
      },

      onClose: () => {
        setIsProcessing(false);
        setSuccessMessage("Payment was cancelled.");
      },
    }).openIframe();
  };

  const isButtonDisabled = isProcessing || !hasAgreedToTerms || !isPaystackReady;


  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-[#ffe8a8] p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#c39130]">{serviceName}</h3>
        <p className="text-gray-600 mt-1">
          Total: <span className="font-bold text-xl">{formatCurrency(totalPrice)}</span>
        </p>
      </div>

      {/* Deposit Options */}
      <div className="mb-6">
        <p className="font-semibold mb-3">Choose Payment Option</p>
        <div className="grid grid-cols-3 gap-4">
          {[25, 50, 100].map((p) => {
            const amt = totalPrice * (p / 100);
            const active = selectedDepositOption === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedDepositOption(p)}
                className={`py-5 rounded-xl border-2 transition-all ${
                  active
                    ? "bg-[#fac446] text-white border-[#c39130] shadow-lg ring-4 ring-[#fbe5a7]"
                    : "bg-gray-50 border-gray-200 hover:border-[#fac446]"
                }`}
              >
                <div className="text-2xl font-bold">{p}%</div>
                <div className="text-sm">{formatCurrency(amt)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount Due */}
      <div className="bg-[#fff8e6] border-2 border-[#ffe8a8] rounded-xl p-5 mb-6 text-center">
        <p className="font-bold text-lg">Pay Now</p>
        <p className="text-3xl font-black text-[#a57b28]">
          {formatCurrency(amountToChargeKobo / 100)}
        </p>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={hasAgreedToTerms}
          onChange={(e) => setHasAgreedToTerms(e.target.checked)}
          className="mt-1 w-5 h-5 text-[#fac446] rounded focus:ring-[#fac446]"
        />
        <span className="text-sm text-gray-700">
          I agree to the{" "}
          <button type="button" onClick={() => openModal("terms")} className="text-[#fac446] font-bold underline">
            Terms & Conditions
          </button>{" "}
          and{" "}
          <button type="button" onClick={() => openModal("policy")} className="text-[#fac446] font-bold underline">
            Cancellation Policy
          </button>
          .
        </span>
      </label>

      {/* Messages */}
      {/* Only show the generic 'Loading' message if the script isn't ready 
        AND there is no load error yet. 
      */}
      {!isPaystackReady && !paymentError && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading Payment Gateway... Please wait.
        </div>
      )}
      
      {paymentError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {paymentError}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isButtonDisabled}
        className={`w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
          isButtonDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#fac446] hover:bg-[#c39130] text-white shadow-xl"
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Processing...
          </>
        ) : isPaystackReady ? (
          <>Pay Now — {formatCurrency(amountToChargeKobo / 100)}</>
        ) : paymentError ? ( // isPaystackReady is false and we have an error (script failed)
          <>
            <X className="w-6 h-6" />
            Payment Unavailable
          </>
        ) : ( // isPaystackReady is false and no error yet (still loading)
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Loading Gateway...
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        Secured by Paystack • Your card details are never stored
      </p>

      {/* Modal */}
      {isModalOpen && <PolicyModal title={modalTitle} content={modalContent} onClose={closeModal} />}
    </div>
  );
}