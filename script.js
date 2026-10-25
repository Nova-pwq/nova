(function(){
  var root=document.documentElement;
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click',function(){
      var l=b.getAttribute('data-set');
      root.setAttribute('data-lang',l);root.lang=l;
      try{localStorage.setItem('nova-lang',l)}catch(e){}
    });
  });
  root.lang=root.getAttribute('data-lang');
  var y=document.getElementById('y');if(y)y.textContent=new Date().getFullYear();
})();
