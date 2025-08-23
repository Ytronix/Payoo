//* login-btn  ,   mobile-number ,    pin-number
const verifyMobile = 12345678910;
const verifyPin = 1234;

document.getElementById("login-btn").addEventListener("click",
    function () {
        const mobileNumber = document.getElementById("mobile-number").value;
        const pinNumber = document.getElementById("pin-number").value;
        if (isNaN(Number(mobileNumber)) || isNaN(Number(pinNumber))) {
            alert("Please Input a Valid Number");
        }
        else if (verifyMobile === Number(mobileNumber) && verifyPin === Number(pinNumber)) {
            console.log("Login Succesfully.");
        }
        else {
            alert("Invalid Credentials");
        }
});
