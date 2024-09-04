
let employeeData;
$(document).ready(function () {
    // Fetch employee names and populate the dropdown
    $.ajax({
        url: 'http://localhost:8080/api/employees/empAllEmp', // Update with your actual API URL to get employees
        method: 'GET',
        success: function (data) {
            var employeeDropdown = $('#employeeDropdown');
            data.forEach(function (employee) {
                // Debugging line to ensure the loop runs
                console.log("Adding employee:", employee.name);
                employeeDropdown.append($('<option>', {
                    value: employee.name,
                    text: employee.name
                }));
            });
        },
        error: function (error) {
            console.error("Error fetching employees:", error);
        }
    });

    // Fetch employee data when the page loads
    fetchEmployeeData();
});

function fetchEmployeeData() {
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();
    // alert("alert1");
    if (!selectedEmployee || !selectedMonth) {
        console.error('Please select both employee and month.');
        return;
    }

    var url = `http://localhost:8080/findByNameAndMonth?name=${encodeURIComponent(selectedEmployee)}&month=${encodeURIComponent(selectedMonth)}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
             employeeData = data
            console.log("data..",data)
            console.log("employeeData..",employeeData)
            document.getElementById('employeeId').innerHTML = `${employeeData.employee}`;
            document.getElementById('employeeName').innerHTML = ` ${employeeData.employee2.name}`;
            document.getElementById('employeeEmpCode').innerHTML = `${employeeData.employee2.empCode}`;
            document.getElementById('employeeAddress').innerHTML = ` ${employeeData.employee2.address}`;
            document.getElementById('employeeJDate').innerHTML = ` ${employeeData.employee2.jDate}`;
            document.getElementById('designationName').innerHTML = `${employeeData.employee2.designation.designation}`;
            document.getElementById('grossSalary').innerHTML = `${employeeData.employee2.salary.grossSalary}`;
            document.getElementById('basicSalary').innerHTML = ` ${employeeData.employee2.salary.basicSalary}`;
            document.getElementById('ta').innerHTML = ` ${employeeData.employee2.salary.ta}`;
            document.getElementById('da').innerHTML = ` ${employeeData.employee2.salary.da}`;
            document.getElementById('pf').innerHTML = ` ${employeeData.employee2.salary.pf}`;
            document.getElementById('other').innerHTML = ` ${employeeData.employee2.salary.other}`;
            document.getElementById('finalBasicSalary').innerHTML = ` ${employeeData.employee2.salary.finalBasicSalary}`;
            document.getElementById('deduction').innerHTML = ` ${employeeData.employee2.salary.deduction}`;
            document.getElementById('employeeInsurance').innerHTML = `${employeeData.employee2.insurance}`;
            document.getElementById('month').innerHTML = ` ${employeeData.month}`;
            document.getElementById('lossofpay').innerHTML = ` ${employeeData.lossofpay}`;
            document.getElementById('salaryAmount').innerHTML = ` ${employeeData.salary}`;
            
           
        })
        .catch((error) => {
            console.error("Error fetching employee data:", error);
        });
}

function addEmployeeRow(tbody, employee, selectedMonth) {
    const tr = document.createElement("tr");

}


function getSalary() {
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();
    
    if (!selectedEmployee || !selectedMonth) {
        alert('Please select both employee and month.');
        return;
    }

    var url = `http://localhost:8080/findByNameAndMonth?name=${encodeURIComponent(selectedEmployee)}&month=${encodeURIComponent(selectedMonth)}`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            console.log('Response Data:', data);
            employeeData = data
            if (data && data.salary !== undefined) {
                var salaryDetails = `Salary: ${data.salary}</p>`;
                $('#salaryDetails').html(salaryDetails);
            } else {
                $('#salaryDetails').text('Unexpected response format.');
            }
        },
        error: function (error) {
            console.error("Error fetching salary data:", error);
            $('#salaryDetails').text('Error fetching salary data.');
        }
    });
}

function deleteSalary() {
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();

    var url = `http://localhost:8080/deleteByNameAndMonth?name=${encodeURIComponent(selectedEmployee)}&month=${encodeURIComponent(selectedMonth)}`;

    $.ajax({
        url: url,
        method: 'DELETE',
        success: function (data) {
            console.log('Response Data:', data);

            if (typeof data === 'string' && data.toLowerCase().includes('deleted successfully')) {
                $('#salaryDetails').text('Record deleted successfully.');
                
                $('#employeeDropdown').val('');
                $('#monthSelect').val('');
            } else {
                $('#salaryDetails').text(data || 'Delete operation did not return a valid response.');
            }
        },
        error: function (error) {
            console.error("Error deleting data:", error);
            $('#salaryDetails').text('Error deleting data.');
        }
    });
}


