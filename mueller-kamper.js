(function() {
    
    var adrese = [
{
    salutation: 1, // 2-boy, 1-girl
    firstname: 'Katja',
    lastname: 'Radinčić',
    email: 'katja2007sk@gmail.com',
    street: 'Odranska',
    streetNumber: '15',
    telephone: '0957321020‬',
    zipcode: '44000',
    city: 'Sisak',
    countryIndex: 1,
 }, {
    salutation: 1, // 2-boy, 1-girl
    firstname: 'Nina',
    lastname: 'Anđelinić',
    email: 'nina.matkova.irenina@gmail.com',
    street: 'Fausta Vrančića',
    streetNumber: '12',
    telephone: '0981883755‬',
    zipcode: '10410',
    city: 'Velika Gorica',
    countryIndex: 1,
 }, {
    salutation: 2, // 2-boy, 1-girl
    firstname: 'Matko',
    lastname: 'Anđelinić',
    email: 'matko.andjelinic@gmail.com',
    street: 'Fausta Vrančića',
    streetNumber: '12',
    telephone: '098341584',
    zipcode: '10410',
    city: 'Velika Gorica',
    countryIndex: 1,
}, {
    salutation: 1, // 2-boy, 1-girl
    firstname: 'Lucija',
    lastname: 'Kostopeč-Anđelinić',
    email: 'lucija.kostopec.andjelinic@gmail.com',
    street: 'Jakova Gotovca',
    streetNumber: '14',
    telephone: '0997369003',
    zipcode: '10000',
    city: 'Zagreb',
    countryIndex: 1,

}, {
    salutation: 1, // 2-boy, 1-girl
    firstname: 'Irena',
    lastname: 'Čubra',
    email: 'icubra@gmail.com',
    street: 'Fausta Vrančića',
    streetNumber: '12',
    telephone: '0915654961',
    zipcode: '10410',
    city: 'Velika Gorica',
    countryIndex: 1,

}, {
    salutation: 2, // 2-boy, 1-girl
    firstname: 'Zdravko',
    lastname: 'Čubra',
    email: 'zdravko.cubra.sk@gmail.com',
    street: 'Odranska',
    streetNumber: '15',
    telephone: '098262265',
    zipcode: '44000',
    city: 'Sisak',
    countryIndex: 1,
}
    
    ];

  
    var script = document.createElement('script');
    script.onload = function() {
        setInterval(function() {
            var fill = function(document) {
                var fillData = adrese[Math.floor(Math.random()*adrese.length)];
                el = document.querySelector('select[name="salutation"]');
                el.selectedIndex = fillData.salutation;
                el.dispatchEvent(new Event('change'));
                var el;
                el = document.querySelector('input[name="firstname"]');
                el.value = fillData.firstname;

                el = document.querySelector('textarea[name="loesungswort"]');
                el.value = "7";
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="lastname"]');
                el.value = fillData.lastname;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="email"]');
                el.value = fillData.email;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="street"]');
                el.value = fillData.street;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="streetNumber"]');
                el.value = fillData.streetNumber;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="telephone"]');
                el.value = fillData.telephone;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="zipcode"]');
                el.value = fillData.zipcode;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('input[name="city"]');
                el.value = fillData.city;
                el.dispatchEvent(new Event('input'));
                el = document.querySelector('select[name="country"]');
                el.selectedIndex = fillData.countryIndex;
                el.dispatchEvent(new Event('change'));
                el = document.querySelector('input[class="mu-checkbox__input"]');
                el.click();
                el.dispatchEvent(new Event('change'));
                setTimeout(function() {
                    var img = document.querySelector(".mu-captcha__image");
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var text = GOCR(canvas);
                    text = text.replace(/\s+/g, '');
                    text = text.toLowerCase();
                    el = document.querySelector('input[class="mu-captcha__input"]');
                    el.value = text;
                    el.dispatchEvent(new Event('input'));
                    if (text.match(/_/) == '_') return;
                    setTimeout(function() {
                        document.querySelector('button.mu-button').click()
                        //alert('click');
                    }, 4000);
                }, 2000);
            };
            var iframe = window.mifr;
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = "mifr";
                iframe.style.display = "block";
                iframe.style.width = "500px";
                iframe.style.height = "500px";
                document.body.appendChild(iframe);
                window.location = "#mifr";
                window.mifr = iframe;
            };
            iframe.src = "https://www.mueller.hr/aktualno/nagradne-igre/adventski-kalendar-2018/"; /* your URL here */ ;
            setTimeout(function() {
                iframe.contentWindow.scrollTo(0, 1700);
                fill(iframe.contentWindow.document);
            }, 3000);
        }, 40000);
    };
    script.src = "https://hcesar.github.io/captcha-solver-js/gocr.js";
    document.head.appendChild(script)
}
)()