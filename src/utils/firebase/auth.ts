import auth from '@react-native-firebase/auth';

// Step 1: Send OTP
const sendOtp = async (phoneNumber) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation; // This confirmation object will be used for OTP verification.
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

const verifyOtp = async (confirmation, otpCode) => {
  try {
    const response = await confirmation.confirm(otpCode);
    const idToken = await response.user.getIdToken(); // Retrieve the ID token after verification
    return idToken;
  } catch (error) {
    console.error('Error verifying OTP:', error);
  }
};

export {
    sendOtp,
    verifyOtp,
};
