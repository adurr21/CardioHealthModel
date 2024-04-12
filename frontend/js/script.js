document.getElementById("predictionForm").addEventListener("submit", function(event) {
    
    // prevents page refresh on submit button, for now at least. 
    event.preventDefault();
    
    // create key value pairs for the form data 
    var formData = {
        "general-health": document.getElementById("general-health").value,
        "last-checkup": document.getElementById("last-checkup").value,
        "skin-cancer": document.querySelector('input[name="skin-cancer"]:checked').value,
        "other-cancer": document.querySelector('input[name="other-cancer"]:checked').value,
        "depression": document.querySelector('input[name="depression"]:checked').value,
        "diabetes": document.querySelector('input[name="diabetes"]:checked').value,
        "smoking-history": document.querySelector('input[name="smoking-history"]:checked').value,
        "exercise": document.querySelector('input[name="exercise"]:checked').value,
        "arthritis": document.querySelector('input[name="arthritis"]:checked').value,
        "sex": document.querySelector('input[name="sex"]:checked').value,
        "age": document.getElementById("age").value,
        "alcohol-consumption": document.getElementById("alcohol-consumption").value,
        "height-feet": document.getElementById("height-feet").value,
        "height-inches": document.getElementById("height-inches").value,
        "weight": document.getElementById("weight").value,
    };

    // fetch server 
    fetch('/url of server yea?', {
        // request method
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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