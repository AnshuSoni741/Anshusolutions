
// ======== Data ========
const SERVICES = [
  { key: 'electricity', name: 'Electrical Wiring & Repair', img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1600&auto=format&fit=crop', desc: 'House wiring, earthing, meter board, short-circuit fix, new installations.' },
  { key: 'construction', name: 'Civil & Construction', img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1600&auto=format&fit=crop', desc: 'Masonry, concrete, tiling, plaster, site supervision and renovation.' },
  { key: 'ac', name: 'AC Installation & Repair', img: 'https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Split/Window AC install, gas refill, servicing and noise/ice issues.' },
  { key: 'cooler', name: 'Air Cooler Repair', img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1600&auto=format&fit=crop', desc: 'Pump, motor, pad change, wiring and seasonal service.' },
  { key: 'plumbing', name: 'Plumbing', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop', desc: 'Leak fix, pipeline, taps, geyser fitting and bathroom renovation.' },
  { key: 'carpentry', name: 'Carpentry', img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop', desc: 'Door/window fitting, modular work, furniture repair.' },
  { key: 'painting', name: 'Painting & POP', img: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1600&auto=format&fit=crop', desc: 'Interior/exterior painting, putty, texture and POP designs.' },
  { key: 'cctv', name: 'CCTV & Security', img: 'https://images.unsplash.com/photo-1566060475410-1159300f046f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'CCTV installation, DVR setup, intercom and access control.' },
  { key: 'solar', name: 'Solar Panel Setup', img: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop', desc: 'Rooftop solar, inverter, net metering and maintenance.' },
  { key: 'it', name: 'IT & Networking', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop', desc: 'WiFi setup, LAN cabling, computer repair and software install.' },
  { key: 'fabrication', name: 'Metal Fabrication & Welding', img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1600&auto=format&fit=crop', desc: 'Grills, gates, frames and on-site welding solutions.' },
  { key: 'gardening', name: 'Gardening & Landscaping', img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1600&auto=format&fit=crop', desc: 'Garden setup, lawn care, drip irrigation and maintenance.' }
];

const ROLES = [
  'Mistri (Mason)','Technician','Electrician','AC Technician','Plumber','Carpenter','Civil Engineer',
  'Mechanical Engineer','Supervisor','Painter','Welder','Fabricator','CCTV Technician','Solar Technician',
  'Roofer','Gardener','IT Support','Network Engineer'
];


// ======== Helpers ========
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

function fillServiceCards(containerSel='.services-grid'){
  const root = $(containerSel);
  if(!root) return;
  root.innerHTML = SERVICES.map(s => `
    <article class="card">
      <img src="${s.img}" alt="${s.name}">
      <div class="p">
        <h3>${s.name}</h3>
        <p class="subtitle" style="margin:8px 0 12px">${s.desc}</p>
        <a class="btn" href="request.html?service=${encodeURIComponent(s.name)}">Request this</a>
      </div>
    </article>
  `).join('');
}

function fillServiceOptions(selectSel='select[name=serviceType]'){
  const el = $(selectSel);
  if(!el) return;
  el.innerHTML = `<option value="">Select a service</option>` + SERVICES.map(s=>`<option>${s.name}</option>`).join('');
}

function fillRoleOptions(selectSel='select[name=role]'){
  const el = $(selectSel);
  if(!el) return;
  el.innerHTML = `<option value="">Select role</option>` + ROLES.map(r=>`<option>${r}</option>`).join('');
}

function qsParam(name){
  const url = new URL(location.href);
  return url.searchParams.get(name);
}

// ======== Storage ========
const DB = {
  save(key, value){
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
    return data.length; // acts as ID
  },
  all(key){ return JSON.parse(localStorage.getItem(key) || '[]'); }
};

// ======== Pages ========
function initHome(){
  fillServiceCards();
  // KPIs
  const kpis = [
    {lbl:'Happy Customers', num: 1200},
    {lbl:'Verified Providers', num: 350},
    {lbl:'Cities Covered', num: 18},
    {lbl:'Avg. Response (min)', num: 30},
  ];
  $('.kpis').innerHTML = kpis.map(k=>`<div class="kpi"><div class="num">${k.num}+</div><div class="lbl">${k.lbl}</div></div>`).join('');


//following is to change logo image with mobile
  //logo image resposiveness
    function updateImageSrc() {
    const img = document.querySelector('#brim');
    if (screen.width <= 495) {
      img.src = 'Alogo.png';
    }else{
      img.src = 'anshu.png';
    }
  }
  // Run on page load and window resize
  window.addEventListener('load', updateImageSrc);
  window.addEventListener('resize', updateImageSrc);

}

function initProvider(){
  fillRoleOptions();
  fillServiceOptions('select[name=primaryService]');
  const form = $('#providerForm');
  // form.addEventListener('submit', (e)=>{
  //   e.preventDefault();
  //   const data = Object.fromEntries(new FormData(form).entries());
  //   if(!data.name || !data.phone || !data.role){
  //     alert('Please fill Name, Phone and Role.');
  //     return;
  //   }
  //   data.createdAt = new Date().toISOString();
  //   const id = DB.save('providers', data);
  //   $('#status').innerHTML = `<div class="notice">Thank you! Your Provider ID is <b>#P${String(id).padStart(4,'0')}</b>. We will contact you soon.</div>`;
  //   form.reset();
  // });
  data_uploader_setting_for_provider_form();
  // https://script.google.com/macros/s/AKfycbzpFkssmDSqSLygbo5AR9bOQp2Zx2EQq5XvCJ4b-qek6_AwRfMeB3IleQOT2zOE7y5Gsg/exec


  // Show recent providers
  const rows = DB.all('providers').slice(-5).reverse().map((p,i)=>`
    <tr>
      <td>#P${String(DB.all('providers').length - i).padStart(4,'0')}</td>
      <td>${p.name||''}</td>
      <td>${p.role||''}</td>
      <td>${p.primaryService||''}</td>
      <td>${p.city||''}</td>
      <td>${p.phone||''}</td>
    </tr>
  `).join('');
  $('#list').innerHTML = rows || '<tr><td colspan="6">No registrations yet.</td></tr>';

}



// ======================service provider form entry to google sheet====================== 
function data_uploader_setting_for_provider_form(){
   const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzpFkssmDSqSLygbo5AR9bOQp2Zx2EQq5XvCJ4b-qek6_AwRfMeB3IleQOT2zOE7y5Gsg/exec";

    const providerForm = document.getElementById("providerForm");
    const statusDiv = document.getElementById("status");

    providerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusDiv.textContent = "Sending...";
      statusDiv.className = "status";
      const data = Object.fromEntries(new FormData(providerForm).entries());
      const name = document.querySelector("#name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const role = document.getElementById("role").value.trim();
      const primaryService = document.getElementById("primaryService").value.trim();
      const experience = document.getElementById("experience").value.trim();
      const city = document.getElementById("city").value.trim();
      const areas = document.getElementById("areas").value.trim();
      // const idproof = document.getElementById("idproof").value.trim();
      const idproof = "adhar card";
      const skills = document.getElementById("skills").value.trim();
      const agree = document.getElementById("agree").value.trim();

      // if (!data.name | !data.phone | !data.email | !data.role | !data.primaryService | !data.experience | !data.city | !data.areas| !data.idproof | !data.skills | !data.agree) {
      //   statusDiv.textContent = "Please fill in all fields.";
      //   statusDiv.classList.add("error");
      //   return;
      // }

      // check
      console.log(data.name,data.city);


      
      try {
        const response = await fetch(WEB_APP_URL, {
          method: "POST",
          // headers: {
            //   "Content-Type": "application/json"
            // },
            body: JSON.stringify({name,phone,email,role,primaryService,experience,city,areas,idproof,skills,agree})
          });
          const result = await response.json();
          if (result.status === "success") {
            statusDiv.textContent = "Submitted successfully. Thank you!";
            statusDiv.classList.add("success");
            providerForm.reset();
          } else {
            statusDiv.textContent = "Error: " + (result.message || "Something went wrong");
            statusDiv.classList.add("error");
          }
        } catch (err) {
          statusDiv.textContent = "Network error: " + err.toString();
          statusDiv.classList.add("error");
        }
        data.createdAt = new Date().toISOString();
        const id = DB.save('providers', data);
        $('#status').innerHTML = `<div class="notice">Thank you! Your Service Provider ID is <b>#P${String(id).padStart(4,'0')}</b>. We will contact you soon.</div>`;
        
           //to get message through what app
        // Format the WhatsApp message
        let text = `I want to register with anshusolutions with following details:\n\nName: ${name}\nPhone: ${phone}\n Email: ${email}\nRole: ${role}\nPrimary service: ${primaryService}\n Experience (year): ${experience} ,\ncity ${city} \n Working Area: ${areas}\n skills : ${skills}`;

      // Encode message for URL
        let encodedText = encodeURIComponent(text);

      // Replace with your WhatsApp number (with country code, e.g., 91XXXXXXXXXX)
         let phoneNumber = 7905071414;  

         let url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        
      // Open WhatsApp
      window.open(url, "_blank");
      
      });
}
// ======================this end serviceprovider form entry to google sheet=================================================




function initRequest(){
  fillServiceOptions();
  const preselect = qsParam('service');
  if(preselect){ $('select[name=serviceType]').value = preselect; }
  const form = $('#requestForm');
  // form.addEventListener('submit', (e)=>{
  //   e.preventDefault();
  //   const data = Object.fromEntries(new FormData(form).entries());
  //   if(!data.name || !data.phone || !data.serviceType || !data.city){
  //     alert('Please fill Name, Phone, City and Service Type.');
  //     return;
  //   }
  //   data.createdAt = new Date().toISOString();
  //   const id = DB.save('requests', data);
  //   $('#status').innerHTML = `<div class="notice">Request submitted! Your Request ID is <b>#R${String(id).padStart(4,'0')}</b>. Our team will reach out shortly.</div>`;
  //   form.reset();

  // });
  data_uploader_setting_for_request_form();

   const targetElement = document.getElementById('status');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }

  // Show recent requests
  const rows = DB.all('requests').slice(-5).reverse().map((r,i)=>`
    <tr>
      <td>#R${String(DB.all('requests').length - i).padStart(4,'0')}</td>
      <td>${r.name||''}</td>
      <td>${r.serviceType||''}</td>
      <td>${r.city||''}</td>
      <td>${(r.preferredDate||'').slice(0,10)}</td>
      <td>${r.phone||''}</td>
    </tr>
  `).join('');
  $('#list').innerHTML = rows || '<tr><td colspan="6">No requests yet.</td></tr>';

}



// ======================request form entry to google sheet======================

function data_uploader_setting_for_request_form(){
   const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwk0m5Y80gP6LBnLPGMwSxIIQcWEG0Iw0-932INthUsurZX5i4ALRLv_yWsDxu_i2E3/exec";

    const requestForm = document.getElementById("requestForm");
    const statusDiv = document.getElementById("status");

    requestForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusDiv.textContent = "Sending...";
      statusDiv.className = "status";
      const data = Object.fromEntries(new FormData(requestForm).entries());
      const name = document.querySelector("#name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const city = document.getElementById("city").value.trim();
      const address = document.getElementById("address").value.trim();
      const serviceType = document.getElementById("serviceType").value.trim();
      const prefer_date = document.getElementById("preferredDate").value.trim();
      const prefer_time = document.getElementById("preferredTime").value.trim();
      const description = document.getElementById("description").value.trim();
      const urgency = document.getElementById("urgency").value.trim();
      const budget = document.getElementById("budget").value.trim();

      if (!name || !phone || !city || !address || !serviceType || !prefer_date || !prefer_time || !description || !urgency || !budget) {
        statusDiv.textContent = "Please fill in all fields.";
        statusDiv.classList.add("error");
        return;
      }

      console.log(phone,city);

      try {
        const response = await fetch(WEB_APP_URL, {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json"
          // },
          body: JSON.stringify({name,phone,city,address,serviceType,prefer_date,prefer_time,description,urgency,budget })
        });
        const result = await response.json();
        if (result.status === "success") {
          statusDiv.textContent = "Submitted successfully. Thank you!";
          statusDiv.classList.add("success");
          requestForm.reset();
        } else {
          statusDiv.textContent = "Error: " + (result.message || "Something went wrong");
          statusDiv.classList.add("error");
        }
      } catch (err) {
        statusDiv.textContent = "Network error: " + err.toString();
        statusDiv.classList.add("error");
      }
       data.createdAt = new Date().toISOString();
       const id = DB.save('requests', data);
       $('#status').innerHTML = `<div class="notice">Request submitted! Your Request ID is <b>#R${String(id).padStart(4,'0')}</b>. Our team will reach out shortly.</div>`;
      
       //to get message through what app
        // Format the WhatsApp message
      let text = `Service Order with following details:\n\nName: ${name}\nPhone: ${phone}\n city: ${city}\naddress: ${address}\nservice type: ${serviceType}\n prefer date & time: ${prefer_date} , ${prefer_time} \n work description : ${description}\n urgency : ${urgency} \n budget : ${budget} `;

      // Encode message for URL
      let encodedText = encodeURIComponent(text);

      // Replace with your WhatsApp number (with country code, e.g., 91XXXXXXXXXX)
      let phoneNumber = 7905071414;  

      let url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
      
      // Open WhatsApp
      window.open(url, "_blank");
      
      const targetElement = document.getElementsByClassName('statusL');
      
    });
    document.getElementsByClassName("statusL").innerText = document.getElementById("status").innerText
}

//end of google entry



// Page router
document.addEventListener('DOMContentLoaded', () => {
  if(document.body.dataset.page === 'home') initHome();
  if(document.body.dataset.page === 'provider') initProvider();
  if(document.body.dataset.page === 'request') initRequest();
});


