function calculateRequiredMarks() {
    const internalMarks = parseFloat(document.getElementById('internalMarks').value);
    const passingMarks = 50;
    const externalMarksRequired = ((passingMarks - internalMarks) * 2).toFixed(2);

    let resultMessage;
    if (internalMarks < 0 || internalMarks > 50) {
        resultMessage = "Please enter a valid internal mark between 0 and 50.";
    } else if (externalMarksRequired <= 100) {
        resultMessage = `You need to score at least ${externalMarksRequired} marks out of 100 in the external exam to pass.`;
    } else {
        resultMessage = "It is not possible to pass the exam with the given internal marks.";
    }

    document.getElementById('result').innerText = resultMessage;
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
        const externalMarksRequired = ((minMarks - internalMarks) * 2).toFixed(2);
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
        cat1 < 0 || cat1 > 50 || cat2 < 0 || cat2 > 50 || cat3 < 0 || cat3 > 50 ||
        assignment1 < 0 || assignment1 > 50 || assignment2 < 0 || assignment2 > 50 || assignment3 < 0 || assignment3 > 50
    ) {
        document.getElementById('internalResult').innerText = "Please enter valid marks (0-50) for all tests and assignments.";
        return;
    }

    const catTotal = ((cat1 + cat2 + cat3) / 3) * 0.7;
    const assignmentTotal = ((assignment1 + assignment2 + assignment3) / 3) * 0.3;
    const internalMarks = (catTotal + assignmentTotal).toFixed(2);

    document.getElementById('internalResult').innerText = `Your calculated internal marks are: ${internalMarks} (AVG)`;
}
document.getElementById('bottomLogo').addEventListener('click', function() {
    this.classList.toggle('enlarged');
});