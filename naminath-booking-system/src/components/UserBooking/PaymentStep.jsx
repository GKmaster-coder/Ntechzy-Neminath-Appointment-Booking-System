import React, { useState } from 'react';

const PaymentStep = ({ formData, onPaymentSuccess, onBack }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setPaymentProcessing(true);
    setPaymentError('');

    // Simulate payment processing
    try {
      // Validate card details
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolder) {
        throw new Error('Please fill in all card details');
      }

      if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Please enter a valid 16-digit card number');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        onPaymentSuccess('card');
      } else {
        throw new Error('Payment failed. Please try again or use a different card.');
      }
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#222] mb-2">Payment</h3>
        <p className="text-gray-600 text-sm sm:text-base">Complete your booking with secure payment</p>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-[#222] mb-3 sm:mb-4 text-sm sm:text-base">Booking Summary</h4>
        <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Patient:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">{formData.selectedDate} at {formData.selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">OPD Room:</span>
            <span className="font-medium">OPD {formData.selectedOPD}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
            <span className="text-gray-600 font-semibold">Total Amount:</span>
            <span className="font-bold text-[#C00000]">$50.00</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-3 rounded-lg border-2 transition-all text-center ${
              paymentMethod === 'card' 
                ? 'border-[#f8d816] bg-yellow-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-sm">Credit/Debit Card</div>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('upi')}
            className={`p-3 rounded-lg border-2 transition-all text-center ${
              paymentMethod === 'upi' 
                ? 'border-[#f8d816] bg-yellow-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-sm">UPI</div>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                value={cardDetails.cardHolder}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="text-center py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm">
                UPI payment option would be integrated with payment gateway services like PhonePe, Google Pay, etc.
              </p>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your payment information is secure and encrypted
        </p>

        {paymentError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm sm:text-base">{paymentError}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-1/2 bg-gray-200 text-[#222] py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={paymentProcessing}
            className="w-full sm:w-1/2 bg-[#f8d816] text-[#222] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6c714] transition-colors shadow-md text-sm sm:text-base"
          >
            {paymentProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#222]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              `Pay $50.00`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;