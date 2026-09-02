/* PACKAGE ALLOCATION JAVASCRIPT */
const PACKAGE_KEY="visionOfLovePackages";
const packageForm=document.getElementById("packageForm");
const packageTable=document.getElementById("packageTable");
let selectedPackageId=null;
function getPackages(){return JSON.parse(localStorage.getItem(PACKAGE_KEY)||"[]");}
function savePackages(rows){localStorage.setItem(PACKAGE_KEY,JSON.stringify(rows));}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderPackages(){const rows=getPackages(); packageTable.innerHTML=rows.length?rows.map(r=>`<tr class="selectable-row" data-package-id="${esc(r.id)}"><td>${esc(r.id)}</td><td>${esc(r.name)}</td><td>${esc(r.type)}</td><td>${esc(r.quantity)}</td><td>${esc(r.status)}</td></tr>`).join(""): '<tr><td colspan="5">No records to display</td></tr>'; packageTable.querySelectorAll(".selectable-row").forEach(row=>row.addEventListener("click",()=>loadPackage(row.dataset.packageId)));}
function loadPackage(id){const r=getPackages().find(x=>x.id===id);if(!r)return;selectedPackageId=id;packageId.value=r.id;packageName.value=r.name||"";packageType.value=r.type||"";quantity.value=r.quantity||"";status.value=r.status||"";}
function clearPackage(){packageForm.reset();selectedPackageId=null;}
packageForm.addEventListener("submit",e=>{e.preventDefault();if(!packageForm.checkValidity()){packageForm.reportValidity();return;}if(selectedPackageId){alert("A package is selected. Use Update to change it.");return;}const rows=getPackages(),r={id:packageId.value.trim(),name:packageName.value.trim(),type:packageType.value,quantity:quantity.value,status:status.value};if(rows.some(x=>x.id===r.id)){alert("Package ID already exists. Select it and use Update.");return;}rows.push(r);savePackages(rows);renderPackages();clearPackage();alert("Package saved successfully.");});
document.getElementById("updatePackage").addEventListener("click",()=>{if(!selectedPackageId){alert("Select a displayed package first.");return;}if(!packageForm.checkValidity()){packageForm.reportValidity();return;}const rows=getPackages(),i=rows.findIndex(x=>x.id===selectedPackageId);if(i<0){alert("Package not found.");return;}rows[i]={id:selectedPackageId,name:packageName.value.trim(),type:packageType.value,quantity:quantity.value,status:status.value};savePackages(rows);renderPackages();clearPackage();alert("Package updated successfully.");});
document.getElementById("deletePackage").addEventListener("click",()=>{if(!selectedPackageId){alert("Select a displayed package first.");return;}if(!confirm("Are you sure you want to delete this package?"))return;savePackages(getPackages().filter(x=>x.id!==selectedPackageId));renderPackages();clearPackage();alert("Package deleted successfully.");});
document.getElementById("displayPackage").addEventListener("click",()=>{document.querySelector(".table-panel").classList.remove("display-panel-hidden");renderPackages();});
document.getElementById("clearPackage").addEventListener("click",()=>{clearPackage();document.querySelector(".table-panel").classList.add("display-panel-hidden");});
