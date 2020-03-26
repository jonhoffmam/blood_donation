document
   .getElementById('btnHelp')
   .addEventListener("click", function() {
      document
         .querySelector('.form')
         .classList.toggle('hide')
   })

document
   .getElementById('btnDonation')
   .addEventListener('click', function() {
      const name = document.querySelector('input[name=name]').value
      const email = document.querySelector('input[name=email]').value
      const blood = document.querySelector('input[name=blood]').value
      if (name == '' || email == '' || blood == '') {
         alert('Digite o seu nome!')         
      }     
   })