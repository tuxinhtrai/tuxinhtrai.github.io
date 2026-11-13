(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const grid = $("#postsGrid"), empty = $("#emptyState"), title = $("#sectionTitle");
  let activeFilter = "all", query = "", visible = 8, layout = "grid";

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const slug = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const matches = post => {
    const f = activeFilter === "all" || post.category.toLowerCase() === activeFilter.toLowerCase() || post.category.toLowerCase().includes(activeFilter.toLowerCase());
    const q = !query || [post.title,post.excerpt,post.category].join(" ").toLowerCase().includes(query);
    return f && q;
  };
  function card(post, index) {
    const img = post.image || "";
    return `<article class="post-card" style="--delay:${index*45}ms">
      <a class="post-image" href="${post.url ? escapeHTML(post.url) : `?post=${post.id}`}" ${post.url ? 'target="_blank" rel="noopener"' : ""}>
        <img src="${escapeHTML(img)}" alt="${escapeHTML(post.title)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')">
        <span class="image-category">${escapeHTML(post.category)}</span><span class="image-arrow">↗</span>
      </a>
      <div class="post-body"><div class="post-meta"><span>${escapeHTML(post.date)}</span><i></i><span>${escapeHTML(post.read || "5 phút đọc")}</span></div>
        <h3><a href="${post.url ? escapeHTML(post.url) : `?post=${post.id}`}" ${post.url ? 'target="_blank" rel="noopener"' : ""}>${escapeHTML(post.title)}</a></h3>
        <p>${escapeHTML(post.excerpt)}</p>
        <a class="read-more" href="${post.url ? escapeHTML(post.url) : `?post=${post.id}`}" ${post.url ? 'target="_blank" rel="noopener"' : ""}>Đọc tiếp <span>→</span></a>
      </div></article>`;
  }
  function render() {
    const list = POSTS.filter(matches);
    grid.classList.toggle("list-layout", layout === "list");
    grid.innerHTML = list.slice(0,visible).map(card).join("");
    empty.hidden = list.length !== 0;
    $("#loadMore").hidden = list.length <= visible;
    title.textContent = activeFilter === "all" ? (query ? "Kết quả tìm kiếm" : "Bài viết mới nhất") : `Chủ đề: ${activeFilter}`;
  }
  function setFilter(filter) {
    activeFilter = filter || "all"; visible = 8;
    $$(".filter-chip").forEach(b => b.classList.toggle("active", b.dataset.filter.toLowerCase() === activeFilter.toLowerCase()));
    render();
    if (location.hash !== "#posts") history.replaceState(null,"","#posts");
  }
  $("#filterRow").addEventListener("click", e => { const b=e.target.closest("[data-filter]"); if(b) setFilter(b.dataset.filter); });
  document.addEventListener("click", e => {
    const b=e.target.closest("[data-category]");
    if(b){ e.preventDefault(); setFilter(b.dataset.category); $("#mobileNav").classList.remove("open"); $("#posts").scrollIntoView({behavior:"smooth"}); }
    const tag=e.target.closest(".tag-cloud [data-filter]"); if(tag){ setFilter(tag.dataset.filter); $("#posts").scrollIntoView({behavior:"smooth"}); }
  });
  $("#searchForm").addEventListener("submit", e => { e.preventDefault(); query=$("#searchInput").value.trim().toLowerCase(); visible=8; setFilter("all"); render(); $("#posts").scrollIntoView({behavior:"smooth"}); });
  $("#searchInput").addEventListener("input", e => { if(!e.target.value){query="";render();} });
  $("#loadMore").addEventListener("click", () => { visible += 4; render(); });
  $("#gridView").addEventListener("click",()=>{layout="grid";$("#gridView").classList.add("active");$("#listView").classList.remove("active");render();});
  $("#listView").addEventListener("click",()=>{layout="list";$("#listView").classList.add("active");$("#gridView").classList.remove("active");render();});
  $("#mobileMenuBtn").addEventListener("click",()=>$("#mobileNav").classList.toggle("open"));
  $("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("cp-theme",document.body.classList.contains("dark")?"dark":"light");});
  if(localStorage.getItem("cp-theme")==="dark") document.body.classList.add("dark");
  $("#year").textContent = new Date().getFullYear();
  $("#backTop").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  window.addEventListener("scroll",()=>$("#backTop").classList.toggle("show",window.scrollY>500));
  $("#popularPosts").innerHTML = POSTS.filter(p=>p.popular).slice(0,5).map((p,i)=>`<a class="popular-item" href="${p.url ? escapeHTML(p.url) : `?post=${p.id}`}" ${p.url ? 'target="_blank" rel="noopener"' : ""}><b>0${i+1}</b><span>${escapeHTML(p.title)}<small>${escapeHTML(p.category)} · ${escapeHTML(p.date)}</small></span><i>↗</i></a>`).join("");
  // Trang chi tiết tối giản khi mở ?post=ID (có thể thay bằng URL bài viết thật).
  const postId = new URLSearchParams(location.search).get("post");
  if(postId){
    const post=POSTS.find(p=>String(p.id)===postId);
    if(post){
      document.title = post.title + " — Code Pro Blog";
      const detail=document.createElement("section"); detail.className="detail-page";
      detail.innerHTML=`<a href="./" class="back-link">← Trở về trang chủ</a><div class="eyebrow">${escapeHTML(post.category)} · ${escapeHTML(post.date)}</div><h1>${escapeHTML(post.title)}</h1><p class="detail-lead">${escapeHTML(post.excerpt)}</p><img src="${escapeHTML(post.image)}" alt="${escapeHTML(post.title)}"><div class="detail-note"><strong>Đây là trang mẫu của bài viết.</strong><p>Hãy thêm URL bài viết thật trong <code>assets/js/data.js</code> hoặc thay phần nội dung mẫu này bằng nội dung của bạn.</p></div>`;
      $("main").prepend(detail); $("#posts").hidden=true; $(".hero").hidden=true; $(".announcement").hidden=true; $("#ecosystem").hidden=true; $("#about").hidden=true;
    }
  }
  render();
})();
