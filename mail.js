const firebaseConfig = {
  //your firebase details here
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("#");
  
  document.getElementById("#").addEventListener("submit", submitForm);

  var uniqueID;
  
  function submitForm(e) {
    e.preventDefault();
  
    var fname = getElementVal("fname");
    var mca = getElementVal("mca");
    var gender = getElementVal("gender");
    var dob = getElementVal("dob");
    var age = getElementVal("age");
    var mobile = getElementVal("mobile");
    var email = getElementVal("email");
    var city = getElementVal("city");
    var profession = getElementVal("profession");
    const imageInput = document.getElementById("image");
    const imageFile = imageInput.files[0];
    var ageCheck = document.getElementById('ageCheck');
    var spendingCheck = document.getElementById('spendingCheck');
    var termsCheck = document.getElementById('termsCheck');
    const timestamp = Date.now();
    const baseUrl = "#";
    const business = "#";
    const register = "#";
    const start = "#";
    const help = "#";
    const about = "#";
    const websiteLink = baseUrl + "id=" + timestamp;
    const businessLink = business + "id=" + timestamp;
    const registerLink = register + "id=" + timestamp;
    const startLink = start + "id=" + timestamp;
    const helpLink = help + "id=" + timestamp;
    const aboutLink = about + "id=" + timestamp;

    // Get current date and time
    const now = new Date();
    // Format date as DD-MM-YYYY
    const date = ("0" + now.getDate()).slice(-2) + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + now.getFullYear();
    // Format time as HH:MM:SS (24 hour format)
    const time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
    //For storing the full name
    const name = fname.replace(/ /g, "_");
    //Create unique child
    uniqueID = date + "_" + name + "_" + time;

    let isValid = true; 

    // Validation functions
    function validateName(fname) {
      return /^[A-Za-z ]+$/.test(fname);
    }
  
    function validateNumber(mca) {
      return mca.length === 8;
  }

  function validateMNumber(mobile) {
      return mobile.length === 10;
  }

  function validateANumber(age) {
      return age.length === 2;
  }
  
    function validateEmail(email) {
      return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email); // Basic email check
    }
  
    // Specific Validations
    if (!validateName(fname)) { 
      alert('Full Name should contain only alphabets and spaces.');
      isValid = false;
    }
    if (!validateNumber(mca, 8)) {
      alert('MCA Number should be exactly 8 digits.');
      isValid = false;
    }
    if (!validateName(gender)) {
      alert('Gender should contain only alphabets.');
      isValid = false;
    }
    if (!validateANumber(age, 2)) {
      alert('Age should be exactly 2 digits.');
      isValid = false;
    }
    if (!validateMNumber(mobile, 10)) {
      alert('Mobile Number should be exactly 10 digits.');
      isValid = false;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      isValid = false;
    }
    if (!validateName(city)) {
      alert('City should contain only alphabets and spaces.');
      isValid = false;
    }
    if (!validateName(profession)) {
      alert('Profession should contain only alphabets and spaces.');
      isValid = false;
    }

    if (!imageFile.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      isValid = false;
    }

    if (imageFile) {
      const fileSize = imageFile.size / 1024; // size in KB
      if (fileSize > 200) {
        alert("The file size should be less than 50KB.");
        isValid = false;
      }
    } else {
      alert("No file selected.");
      isValid = false;
    }

    if (!ageCheck.checked || !spendingCheck.checked || !termsCheck.checked) {
      alert('Please check all the checkboxes.');
      isValid = false;
    }
  
    if (isValid) {
          document.getElementById("#").reset();
          alert('Thank you for registering with Celebrating Life! Your personalized webpage with a message to forward will be sent to you within the next 24 hours. We appreciate your patience and look forward to sharing it with you soon. If you have any questions in the meantime, feel free to reach out to us.');
          const storageRef = firebase.storage().ref('images/' + fname + '_' + timestamp + '.' + imageFile.name.split('.').pop());
          const uploadTask = storageRef.put(imageFile);

          uploadTask.on('state_changed',
            (snapshot) => {
              // ... optional progress tracking ...
            },
            (error) => {
              console.error('Upload failed:', error);
              // Consider adding error display to the user
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // Update saveMessages to include downloadURL
                saveMessages(fname, mca, gender, dob, age, mobile, email, city, profession, downloadURL, timestamp, websiteLink, businessLink, registerLink, startLink, helpLink, aboutLink);
              });
            }
          );
      }    
  }
  
  const saveMessages = (fname, mca, gender, dob, age, mobile, email, city, profession, downloadURL, timestamp, websiteLink, businessLink, registerLink, startLink, helpLink, aboutLink) => {

    var newContactForm = contactFormDB.child(uniqueID);
  
    newContactForm.set({
      fname: fname,
      mca: mca,
      gender: gender,
      dob: dob,
      age: age,
      mobile: mobile,
      email: email,
      city: city,
      profession: profession,
      imageFile: downloadURL,
      timestamp: timestamp,
      websiteLink: websiteLink,
      businessLink: businessLink,
      registerLink: registerLink,
      startLink: startLink,
      helpLink: helpLink,
      aboutLink: aboutLink,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
