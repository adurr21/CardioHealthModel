document.getElementById("predictionForm").addEventListener("submit", function(event) {
    
    // prevents page refresh on submit button, for now at least. 
    event.preventDefault();

    var totalInch = (parseInt(document.getElementById("height-feet").value) * 12) + (parseInt(document.getElementById("height-inches").value));
    var heightCm = (totalInch * 2.54);
    var heightM = (heightCm / 100);
    var weightKg = (parseInt(document.getElementById("weight").value) * 0.45359237);
    var bmi = (weightKg / (heightM * heightM)); 
    var age = parseInt(document.getElementById("age").value);
    var ageStr = '';
    
    if (18 <= age && age <= 24) {
        ageStr = "18 to 24";
    } else if (25 <= age && age <= 29) {
        ageStr = "25 to 29";
    } else if (30 <= age && age <= 34) {
        ageStr = "30 to 34";
    } else if (35 <= age && age <= 39) {
        ageStr = "35 to 39";
    } else if (40 <= age && age <= 44) {
        ageStr = "40 to 44";
    } else if (45 <= age && age <= 49) {
        ageStr = "45 to 49";
    } else if (50 <= age && age <= 54) {
        ageStr = "50 to 54";
    } else if (55 <= age && age <= 59) {
        ageStr = "55 to 59";
    } else if (60 <= age && age <= 64) {
        ageStr = "60 to 64";
    } else if (65 <= age && age <= 69) {
        ageStr = "65 to 69";
    } else if (70 <= age && age <= 74) {
        ageStr = "70 to 74";
    } else if (75 <= age && age <= 79) {
        ageStr = "75 to 79";
    } else {
        ageStr = "80 or older";
    }

    // create key value pairs for the form data 
    const formData = {
        "General Health": document.getElementById("general-health").value,
        "Checkup": document.getElementById("last-checkup").value,
        "Skin Cancer": document.querySelector('input[name="skin-cancer"]:checked').value,
        "Other Cancer": document.querySelector('input[name="other-cancer"]:checked').value,
        "Depression": document.querySelector('input[name="depression"]:checked').value,
        "Diabetes": document.querySelector('input[name="diabetes"]:checked').value,
        "Smoking History": document.querySelector('input[name="smoking-history"]:checked').value,
        "Alcohol Consumption": document.getElementById("alcohol-consumption").value,
        "Excercise": document.querySelector('input[name="exercise"]:checked').value,
        "Arthritis": document.querySelector('input[name="arthritis"]:checked').value,
        "Sex": document.querySelector('input[name="sex"]:checked').value,
        "Age": ageStr,
        "Height (cm)": '' + heightCm.toFixed(2) + '',
        "Weight (kg)": '' + weightKg.toFixed(2) + '',
        "BMI": '' + bmi.toFixed(2) + ''
    };

    // fetch server 
    fetch('http://request.austindurr.com:3360/predict', {
        // request method
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
        },
        // converts js value to a JSON string
        body: JSON.stringify(formData)
    })
    // promise chain , convert response into js object and logs to console for now
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});