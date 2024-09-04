
        function submitForm(event) {
            event.preventDefault();
            
           
            const name = document.getElementById('inputName').value;
            const designation = document.getElementById('inputDesignation').value;
            const address = document.getElementById('inputAddress').value;
            const date = document.getElementById('inputJDate').value;
            const salary = document.getElementById('inputSalary').value;

           

            console.log('Form Data:');
            console.log('Name:', name);
            console.log('Designation:', designation);
            console.log('Address:', address);
            console.log('Joining Date:', date);
            console.log('Gross Salary:', salary);

            
            // window.location.href = 'Submit.html';
        }
