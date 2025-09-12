
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
    // if (screen.width <= 495) {
    //   img.src = 'assets/Alogo.png';
    // }
    // else{
    //   img.src = 'assets/anshu.png';
    // }
    }

  // Run on page load and window resize
  window.addEventListener('load', updateImageSrc);
  window.addEventListener('resize', updateImageSrc);

}

function initProvider(){
  fillRoleOptions();
  fillServiceOptions('select[name=primaryService]');
  const form = $('#providerForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(!data.name || !data.phone || !data.role){
      alert('Please fill Name, Phone and Role.');
      return;
    }
    data.createdAt = new Date().toISOString();
    const id = DB.save('providers', data);
    $('#status').innerHTML = `<div class="notice">Thank you! Your Provider ID is <b>#P${String(id).padStart(4,'0')}</b>. We will contact you soon.</div>`;
    form.reset();
  });
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

function initRequest(){
  fillServiceOptions();
  const preselect = qsParam('service');
  if(preselect){ $('select[name=serviceType]').value = preselect; }
  const form = $('#requestForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(!data.name || !data.phone || !data.serviceType || !data.city){
      alert('Please fill Name, Phone, City and Service Type.');
      return;
    }
    data.createdAt = new Date().toISOString();
    const id = DB.save('requests', data);
    $('#status').innerHTML = `<div class="notice">Request submitted! Your Request ID is <b>#R${String(id).padStart(4,'0')}</b>. Our team will reach out shortly.</div>`;
    form.reset();
  });

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
// Page router
document.addEventListener('DOMContentLoaded', () => {
  if(document.body.dataset.page === 'home') initHome();
  if(document.body.dataset.page === 'provider') initProvider();
  if(document.body.dataset.page === 'request') initRequest();
});


