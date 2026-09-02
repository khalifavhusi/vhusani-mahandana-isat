/* FAMILY RECORDS JAVASCRIPT */
const FAMILY_KEY = "visionOfLoveFamilies";
const familyForm = document.getElementById("familyForm");
const familyTable = document.getElementById("familyTable");
const familyIdInput = document.getElementById("familyId");
let selectedFamilyId = null;

function getFamilies(){ return JSON.parse(localStorage.getItem(FAMILY_KEY) || "[]"); }
function saveFamilies(rows){ localStorage.setItem(FAMILY_KEY, JSON.stringify(rows)); }
function generateFamilyId(){
  let max=0;
  getFamilies().forEach(r=>{ const m=String(r.familyId||"").match(/^C001-(\d+)$/); if(m) max=Math.max(max,Number(m[1])); });
  return `C001-${max+1}`;
}
function setNewFamilyId(){ familyIdInput.value=generateFamilyId(); selectedFamilyId=null; }
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderFamilies(){
  const rows=getFamilies();
  familyTable.innerHTML=rows.length?rows.map(r=>`<tr class="selectable-row" data-family-id="${esc(r.familyId)}"><td>${esc(r.familyId)}</td><td>${esc(r.name)}</td><td>${esc(r.surname)}</td><td>${esc(r.members)}</td><td>${esc(r.package)}</td><td>${esc(r.collectionDate)}</td></tr>`).join(""): '<tr><td colspan="6">No records to display</td></tr>';
  familyTable.querySelectorAll(".selectable-row").forEach(row=>row.addEventListener("click",()=>loadFamily(row.dataset.familyId)));
}
function loadFamily(id){
  const r=getFamilies().find(x=>x.familyId===id); if(!r)return;
  selectedFamilyId=id;
  familyIdInput.value=r.familyId;
  document.getElementById("name").value=r.name||"";
  document.getElementById("surname").value=r.surname||"";
  document.getElementById("members").value=r.members||"";
  document.getElementById("email").value=r.email||"";
  document.getElementById("telephone").value=r.telephone||"";
  document.getElementById("package").value=r.package||"";
  document.getElementById("collectionDate").value=r.collectionDate||"";
}
function clearFamilyForm(){ familyForm.reset(); setNewFamilyId(); }
function readFamily(){return {familyId:familyIdInput.value,name:document.getElementById("name").value.trim(),surname:document.getElementById("surname").value.trim(),members:document.getElementById("members").value,email:document.getElementById("email").value.trim(),telephone:document.getElementById("telephone").value.trim(),package:document.getElementById("package").value,collectionDate:document.getElementById("collectionDate").value};}
familyForm.addEventListener("submit",e=>{
  e.preventDefault();
  if(!familyForm.checkValidity()){familyForm.reportValidity();return;}
  const rows=getFamilies(); const r=readFamily();
  if(selectedFamilyId){ alert("A record is selected. Use Update to change it."); return; }
  if(rows.some(x=>x.familyId===r.familyId)){alert("Family ID already exists. Select the record and use Update.");return;}
  rows.push(r); saveFamilies(rows); renderFamilies(); clearFamilyForm(); alert("Family record saved successfully.");
});
document.getElementById("updateFamily").addEventListener("click",()=>{
  if(!selectedFamilyId){alert("Select a displayed family record first.");return;}
  if(!familyForm.checkValidity()){familyForm.reportValidity();return;}
  const rows=getFamilies(), i=rows.findIndex(x=>x.familyId===selectedFamilyId); if(i<0){alert("Record not found.");return;}
  const r=readFamily(); r.familyId=selectedFamilyId; rows[i]=r; saveFamilies(rows); renderFamilies(); clearFamilyForm(); alert("Record updated successfully.");
});
document.getElementById("displayFamily").addEventListener("click",renderFamilies);
document.getElementById("clearFamily").addEventListener("click",clearFamilyForm);
setNewFamilyId(); renderFamilies();
