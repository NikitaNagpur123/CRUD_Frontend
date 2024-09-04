
let selectName;
$(document).ready(function () {
    // Fetch employee names and populate the dropdown
    $.ajax({
        url: 'http://localhost:8080/api/employees/empAllEmp', // Update with your actual API URL to get employees
        method: 'GET',
        success: function (data) {
            var employeeDropdown = $('#employeeDropdown');
            data.forEach(function (employee) {
                employeeDropdown.append($('<option>', {
                    value: employee.id,
                    text: employee.name,
                    
                }));
                
            });
        },
        error: function (error) {
            console.error("Error fetching employees:", error);
        }
    });

    // Update the employee_id field when an employee is selected
    $('#employeeDropdown').on('change', function () {
        var selectedEmployeeId = $(this).val(); // Get the selected employee's ID
        $('#employee_id').val(selectedEmployeeId); // Set the employee ID in the input field
    });
});


function calculateSalary() {
    alert("bsxnx  sxmnsxs")
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();
    var lossofpay = parseInt($('#lossofpay').val());

    if (!selectedEmployee || !selectedMonth || isNaN(lossofpay)) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate if the salary data already exists for the employee and the selected month


   // http://localhost:8080/api/employees/findByNameAndMonth?month=june&name=priya jain&lossofpay=1

    $.ajax({
        url: `http://localhost:8080/validate?name=${selectedEmployee}&month=${selectedMonth}`,
        method: 'GET',
        success: function (validationResponse) {
            if (validationResponse === "true") {
                // Proceed with fetching employee data and calculating salary
                $.ajax({
                    url: 'http://localhost:8080/api/employees/empAllEmp',
                    method: 'GET',
                    success: function (data) {
                        var employee = data.find(emp => emp.id == selectedEmployee);
                        selectName = employee.name;
                        console.log("hhhhh",selectedEmployee);
                        console.log("hhhhh",employee);
                        
                        if (!employee) {
                            alert('Employee not found.');
                            return;
                        }




                        
                        var baseSalary = employee.salary.grossSalary;
                        var daysInMonth = new Date(new Date(selectedMonth).getFullYear(), new Date(selectedMonth).getMonth() + 1, 0).getDate();
                       
                        var dailyRate = baseSalary / daysInMonth;
                        var finalcal =employee.salary.finalBasicSalary;
                        var finalSalary = finalcal- (lossofpay * dailyRate);

                        $('#finalSalary').text(finalSalary.toFixed(2));

                        var payload = {
                            employee : selectedEmployee,
                            name: selectName,
                            month: selectedMonth,
                            salary: finalSalary,
                            lossofpay:lossofpay
                        };

                        console.log('Payload:', payload); // Log the payload to verify

                        // Send the data to the backend API
                        $.ajax({
                            url: 'http://localhost:8080/salPost',
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(payload),
                            success: function (response) {
                                alert('Salary added successfully.');
                            },
                            error: function (error) {
                                console.error("Error adding salary:", error);
                            }
                        });
                    },
                    error: function (error) {
                        console.error("Error fetching employee data:", error);
                    }
                });
            } else {
                alert('Data already exists for this employee and month.');
            }
        },
        error: function (error) {
            console.error("Error validating data:", error);
        }
    });
}
