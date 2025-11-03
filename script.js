function calculateRequiredMarks() {
    const internalMarks = parseFloat(document.getElementById('internalMarks').value);
    const passingMarks = 45;
    const marks = 50;
    let externalMarksRequired = Math.round(((marks - internalMarks) / 0.6).toFixed(2));

    let resultMessage;
    if (internalMarks < 0 || internalMarks > 40) {
        resultMessage = '<span style="color: #e74c3c; font-weight: 600;">Please enter a valid internal mark between 0 and 40.</span>';
    } else {
        if (externalMarksRequired < 45) {
            externalMarksRequired = 45;
        }

        if (externalMarksRequired <= 100) {
            resultMessage = `<span style="color: #27ae60; font-weight: 700; font-size: 1.15rem;">You need to score at least <strong style="color: #2c3e50;">${externalMarksRequired} marks</strong> out of 100 in the external exam to pass.</span>`;
        } else {
            resultMessage = '<span style="color: #e74c3c; font-weight: 600;">It is not possible to pass the exam with the given internal marks.</span>';
        }
    }

    document.getElementById('result').innerHTML = resultMessage;
    calculateGradeRequirements(internalMarks);
}

function calculateGradeRequirements(internalMarks) {
    const grades = [
        { grade: 'C', minMarks: 50, maxMarks: 55 },
        { grade: 'B', minMarks: 56, maxMarks: 60 },
        { grade: 'B+', minMarks: 61, maxMarks: 70 },
        { grade: 'A', minMarks: 71, maxMarks: 80 },
        { grade: 'A+', minMarks: 81, maxMarks: 90 },
        { grade: 'O', minMarks: 91, maxMarks: 100 },
    ];

    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = '';

    grades.forEach(({ grade, minMarks }) => {
        let externalMarksRequired = ((minMarks - internalMarks) / 0.6).toFixed(2);
        if (externalMarksRequired < 45) {
            externalMarksRequired = 45;
        }

        if (externalMarksRequired <= 100) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grade}</td>
                <td>${minMarks}</td>
                <td>${externalMarksRequired}</td>
            `;
            tableBody.appendChild(row);
        }
    });
}

function calculateInternalMarks() {
    const cat1 = parseFloat(document.getElementById('cat1').value);
    const cat2 = parseFloat(document.getElementById('cat2').value);
    const cat3 = parseFloat(document.getElementById('cat3').value);
    const assignment1 = parseFloat(document.getElementById('assignment1').value);
    const assignment2 = parseFloat(document.getElementById('assignment2').value);
    const assignment3 = parseFloat(document.getElementById('assignment3').value);

    if (
        isNaN(cat1) || isNaN(cat2) || isNaN(cat3) ||
        isNaN(assignment1) || isNaN(assignment2) || isNaN(assignment3) ||
        cat1 < 0 || cat1 > 50 ||
        cat2 < 0 || cat2 > 50 ||
        cat3 < 0 || cat3 > 50 ||
        assignment1 < 0 || assignment1 > 50 ||
        assignment2 < 0 || assignment2 > 50 ||
        assignment3 < 0 || assignment3 > 50
    ) {
        document.getElementById('internalResult').innerHTML = '<span style="color: #e74c3c; font-weight: 600;">Please enter valid marks between 0 and 50 for all fields.</span>';
        return;
    }

    // Calculate average of assignments (add all 3, divide by 3) then multiply by 0.30
    const assignmentAverage = (assignment1 + assignment2 + assignment3) / 3;
    const assignmentContribution = assignmentAverage * 0.30;
    
    // Calculate average of FAT/CAT marks (add all 3, divide by 3) then multiply by 0.70
    const fatAverage = (cat1 + cat2 + cat3) / 3;
    const fatContribution = fatAverage * 0.70;
    
    // Add both contributions to get the final internal marks
    const internalMarks = assignmentContribution + fatContribution;
    const internalMarksRounded = Math.round(internalMarks * 100) / 100; // Round to 2 decimal places

    document.getElementById('internalResult').innerHTML = `<span style="font-size: 1.2rem; font-weight: 700; color: #2c3e50;">Your calculated internal marks are: ${internalMarksRounded}</span>`;
}

document.getElementById('bottomLogo').addEventListener('click', function() {
    this.classList.toggle('enlarged');
});
