/* DELETE / SEARCH JAVASCRIPT */
const FAMILY_KEY_SEARCH="visionOfLoveFamilies";
let currentFamily=null;
const searchTable=document.getElementById("searchTable");
function getFamiliesSearch(){return JSON.parse(localStorage.getItem(FAMILY_KEY_SEARCH)||"[]");}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function showFamily(r){currentFamily=r||null;foundFamilyId.textContent=r?.familyId||'-';foundName.textContent=r?.name||'-';foundSurname.textContent=r?.surname||'-';foundMembers.textContent=r?.members||'-';foundPackage.textContent=r?.package||'-';foundEmail.textContent=r?.email||'-';foundTelephone.textContent=r?.telephone||'-';foundDate.textContent=r?.collectionDate||'-';}
function renderSearch(){const rows=getFamiliesSearch();searchTable.innerHTML=rows.length?rows.map(r=>`<tr class="selectable-row" data-family-id="${esc(r.familyId)}"><td>${esc(r.familyId)}</td><td>${esc(r.name)}</td><td>${esc(r.surname)}</td><td>${esc(r.members)}</td><td>${esc(r.package)}</td><td>${esc(r.collectionDate)}</td></tr>`).join(""): '<tr><td colspan="6">No records to display</td></tr>';searchTable.querySelectorAll(".selectable-row").forEach(row=>row.addEventListener("click",()=>selectFamily(row.dataset.familyId)));}
function selectFamily(id){const r=getFamiliesSearch().find(x=>x.familyId===id);if(r){searchId.value=r.familyId;showFamily(r);}}
document.getElementById("searchButton").addEventListener("click",()=>{const id=searchId.value.trim();const r=getFamiliesSearch().find(x=>x.familyId===id);showFamily(r);if(!r)alert("Record not found.");});
document.getElementById("displaySearch").addEventListener("click",()=>{document.querySelector(".table-panel").classList.remove("display-panel-hidden");renderSearch();});
document.getElementById("deleteButton").addEventListener("click",()=>{if(!currentFamily){alert("Select or search for a record first.");return;}if(!confirm("Are you sure you want to delete this record?"))return;localStorage.setItem(FAMILY_KEY_SEARCH,JSON.stringify(getFamiliesSearch().filter(x=>x.familyId!==currentFamily.familyId)));showFamily(null);searchId.value="";renderSearch();alert("Record deleted successfully.");});
document.getElementById("clearSearch").addEventListener("click",()=>{searchId.value="";showFamily(null);document.querySelector(".table-panel").classList.add("display-panel-hidden");});
