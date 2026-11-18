/* Personal blog: all edits are stored in this browser's localStorage.
   Export JSON regularly. GitHub Pages cannot write changes back to your repository. */
const STORAGE_KEY = "goc-nho-blog-v1";
const defaultData = {
  settings:{eyebrow:"Ghi chép cá nhân · Công nghệ · Cuộc sống",headline:"Xin chào, đây là góc nhỏ của tôi.",intro:"Một nơi lưu lại những điều tôi học được, những ý tưởng bất chợt và vài câu chuyện trên hành trình mỗi ngày.",aboutTitle:"Một chút về tôi",bio:"Tôi yêu việc tìm hiểu cách mọi thứ vận hành, thích ghi chú lại kiến thức hữu ích và tin rằng những điều nhỏ bé được tích lũy mỗi ngày sẽ tạo nên khác biệt lớn.",postsTitle:"Bài viết gần đây",galleryTitle:"Một vài khoảnh khắc",socialTitle:"Kết nối với tôi",socialText:"Bạn có thể tìm thấy tôi ở những không gian trực tuyến bên dưới.",footerText:"© 2026 Góc nhỏ. Viết và lưu giữ những điều đáng nhớ."},
  order:["hero","about","posts","gallery","social"],
  posts:[
    {id:"bat-dau-viet-blog",title:"Bắt đầu một góc nhỏ trên internet",date:"2026-11-18",excerpt:"Vì sao tôi muốn có một nơi riêng để ghi lại những điều mình học và trải nghiệm.",image:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",body:"# Bắt đầu từ những điều nhỏ\n\nTôi muốn tạo một nơi để lưu giữ **những suy nghĩ, ghi chú công nghệ và câu chuyện thường ngày**.\n\n## Vì sao viết?\n\n- Hệ thống hóa điều mình đã học.\n- Dễ dàng tìm lại kiến thức.\n- Chia sẻ những điều hữu ích với mọi người.\n\n```js\nconst smallSteps = () => \"keep learning\";\nconsole.log(smallSteps());\n```\n\nĐây không phải một dự án lớn. Chỉ là một góc nhỏ, được xây dựng từng chút một."},
    {id:"ghi-chu-hoc-tap",title:"Ghi chú là một cách tư duy",date:"2026-11-12",excerpt:"Một vài nguyên tắc đơn giản giúp biến thông tin thành kiến thức có thể sử dụng.",image:"https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=900&q=80",body:"# Ghi chú là một cách tư duy\n\nĐừng cố ghi lại mọi thứ. Hãy ghi lại điều quan trọng và viết bằng ngôn ngữ của chính mình.\n\n## Một quy trình ngắn\n\n1. Đọc hoặc trải nghiệm.\n2. Tóm tắt ý chính bằng lời của mình.\n3. Ghi thêm ví dụ thực tế.\n4. Quay lại áp dụng sau vài ngày.\n\n> Một ghi chú tốt là ghi chú giúp bạn hành động tốt hơn."},
    {id:"mot-ngay-cham-lai",title:"Đôi khi nên đi chậm lại",date:"2026-11-05",excerpt:"Không phải ngày nào cũng cần thật nhiều thành tựu. Có những ngày chỉ cần bình yên.",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900&q=80",body:"# Đi chậm lại\n\nCó những ngày danh sách công việc vẫn còn dài, nhưng điều cần thiết nhất là dừng lại một chút.\n\nPha một tách trà, đi bộ, đọc vài trang sách. Những khoảng nghỉ nhỏ giúp ta nhìn mọi thứ rõ ràng hơn."}
  ]
};
let data = loadData();
let editMode = false;
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
function clone(v){return JSON.parse(JSON.stringify(v));}
function loadData(){try{const saved=localStorage.getItem(STORAGE_KEY);if(!saved)return clone(defaultData);const parsed=JSON.parse(saved);return {...clone(defaultData),...parsed,settings:{...defaultData.settings,...parsed.settings}};}catch(e){return clone(defaultData);}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200);}
function escapeHTML(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderSettings(){for(const [key,value] of Object.entries(data.settings)){const el=$(`[data-edit="${key}"]`);if(el)el.textContent=value;}}
function renderPosts(){
  const list=$("#postList");
  list.innerHTML=data.posts.slice().sort((a,b)=>(b.date||"").localeCompare(a.date||"")).map(post=>`
    <article class="post-card">
      ${post.image?`<img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}" loading="lazy" onerror="this.style.display='none'">`:''}
      <div class="post-card-body">
        <div class="post-date">${escapeHTML(formatDate(post.date))}</div>
        <h3>${escapeHTML(post.title)}</h3><p>${escapeHTML(post.excerpt||"")}</p>
        <a class="read-more" href="#/post/${encodeURIComponent(post.id)}">Đọc bài viết →</a>
        ${editMode?`<button class="ml-3 text-xs font-semibold text-indigo-600" data-edit-post="${escapeHTML(post.id)}">Sửa</button>`:''}
      </div>
    </article>`).join("");
  $$("[data-edit-post]").forEach(btn=>btn.addEventListener("click",()=>openPostDialog(btn.dataset.editPost)));
}
function formatDate(value){if(!value)return "Chưa đặt ngày";const d=new Date(value+"T00:00:00");return d.toLocaleDateString("vi-VN",{day:"2-digit",month:"long",year:"numeric"});}
function renderOrder(){
  const container=$("#sections");
  const blocks=new Map($$("[data-section]",container).map(el=>[el.dataset.section,el]));
  data.order.forEach(id=>{if(blocks.has(id))container.appendChild(blocks.get(id));});
}
function render(){
  renderSettings();renderOrder();renderPosts();
  document.body.classList.toggle("edit-mode",editMode);
  $("#editorBar").classList.toggle("hidden",!editMode);
  $("#editorNotice").classList.toggle("hidden",!editMode);
  $("#editModeBtn").textContent=editMode?"Đang chỉnh sửa":"Chỉnh sửa";
  $("#addPostBtn").classList.toggle("hidden",!editMode);
  setupEditableFields();
  setupDragDrop();
}
function setupEditableFields(){
  $$("[data-edit]").forEach(el=>{
    el.contentEditable=editMode?"true":"false";
    el.spellcheck=true;
    el.onblur=()=>{if(!editMode)return;data.settings[el.dataset.edit]=el.textContent.trim();save();};
    el.onkeydown=e=>{if(e.key==="Enter" && el.tagName!=="P"){e.preventDefault();el.blur();}};
  });
}
function setupDragDrop(){
  $$("[data-section]").forEach(el=>{
    el.draggable=editMode;
    el.ondragstart=e=>{if(!editMode)return;el.classList.add("dragging");e.dataTransfer.setData("text/plain",el.dataset.section);e.dataTransfer.effectAllowed="move";};
    el.ondragend=()=>{el.classList.remove("dragging");$$(".drag-over").forEach(x=>x.classList.remove("drag-over"));};
    el.ondragover=e=>{if(!editMode)return;e.preventDefault();el.classList.add("drag-over");};
    el.ondragleave=()=>el.classList.remove("drag-over");
    el.ondrop=e=>{if(!editMode)return;e.preventDefault();el.classList.remove("drag-over");const moving=$(`[data-section="${e.dataTransfer.getData("text/plain")}"]`);if(moving&&moving!==el){const rect=el.getBoundingClientRect();const after=e.clientY>rect.top+rect.height/2;el.parentNode.insertBefore(moving,after?el.nextSibling:el);data.order=$$("[data-section]").map(x=>x.dataset.section);save();}};
  });
}
function openPostDialog(id=null){
  const post=data.posts.find(p=>p.id===id);
  $("#postId").value=post?.id||"";
  $("#postTitle").value=post?.title||"";
  $("#postExcerpt").value=post?.excerpt||"";
  $("#postDate").value=post?.date||new Date().toISOString().slice(0,10);
  $("#postImage").value=post?.image||"";
  $("#postBody").value=post?.body||"# Tiêu đề bài viết\n\nViết nội dung tại đây...";
  $("#deletePostBtn").classList.toggle("hidden",!post);
  $("#postDialog").showModal();
}
function closeDialog(){$("#postDialog").close();}
function renderPostPage(){
  const match=location.hash.match(/^#\/post\/(.+)$/);
  const isPost=!!match;
  $("#homeView").classList.toggle("hidden",isPost);
  $("#postView").classList.toggle("hidden",!isPost);
  if(!isPost)return;
  const id=decodeURIComponent(match[1]);
  const post=data.posts.find(p=>p.id===id);
  if(!post){$("#postContent").innerHTML="<h1>Không tìm thấy bài viết</h1><p>Bài viết có thể đã bị xóa.</p>";return;}
  const md=window.marked?marked.parse(post.body||""):`<pre>${escapeHTML(post.body||"")}</pre>`;
  $("#postContent").innerHTML=`<p class="post-date mb-4">${escapeHTML(formatDate(post.date))}</p><h1>${escapeHTML(post.title)}</h1><p class="mb-8 text-lg text-slate-500">${escapeHTML(post.excerpt||"")}</p>${post.image?`<img class="mb-8 w-full rounded-2xl" src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}">`:''}${md}`;
  if(window.hljs)$("#postContent").querySelectorAll("pre code").forEach(block=>hljs.highlightElement(block));
}
function exportData(){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="personal-blog-data.json";a.click();URL.revokeObjectURL(url);toast("Đã xuất dữ liệu JSON");
}
function importData(file){
  const reader=new FileReader();reader.onload=()=>{try{const imported=JSON.parse(reader.result);if(!Array.isArray(imported.posts)||!imported.settings)throw new Error("Invalid");data={...clone(defaultData),...imported,settings:{...defaultData.settings,...imported.settings}};save();render();renderPostPage();toast("Đã nhập dữ liệu");}catch(e){alert("File JSON không hợp lệ hoặc thiếu dữ liệu cần thiết.");}};reader.readAsText(file);
}
$("#editModeBtn").addEventListener("click",()=>{editMode=!editMode;render();});
$("#doneBtn").addEventListener("click",()=>{editMode=false;render();toast("Đã lưu thay đổi trên trình duyệt");});
$("#layoutBtn").addEventListener("click",()=>toast("Kéo các khối bằng chuột hoặc thao tác chạm giữ để sắp xếp."));
$("#exportBtn").addEventListener("click",exportData);
$("#importInput").addEventListener("change",e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value="";});
$("#resetBtn").addEventListener("click",()=>{if(confirm("Khôi phục toàn bộ nội dung mặc định? Các thay đổi hiện tại sẽ mất.")){data=clone(defaultData);save();render();renderPostPage();toast("Đã khôi phục nội dung mẫu");}});
$("#addPostBtn").addEventListener("click",()=>openPostDialog());
$("#closeDialog").addEventListener("click",closeDialog);
$("#cancelDialog").addEventListener("click",closeDialog);
$("#postForm").addEventListener("submit",e=>{
  e.preventDefault();
  const title=$("#postTitle").value.trim();const id=$("#postId").value||slugify(title);
  const post={id,title,excerpt:$("#postExcerpt").value.trim(),date:$("#postDate").value,image:$("#postImage").value.trim(),body:$("#postBody").value};
  const index=data.posts.findIndex(p=>p.id===$("#postId").value);
  if(index>=0)data.posts[index]=post;else data.posts.unshift(post);
  save();renderPosts();closeDialog();toast("Đã lưu bài viết");
});
$("#deletePostBtn").addEventListener("click",()=>{const id=$("#postId").value;if(id&&confirm("Xóa bài viết này?")){data.posts=data.posts.filter(p=>p.id!==id);save();renderPosts();closeDialog();toast("Đã xóa bài viết");}});
function slugify(text){return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"bai-viet-"+Date.now();}
window.addEventListener("hashchange",renderPostPage);
render();renderPostPage();
