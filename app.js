// Array to temporarily hold data fetched from the database
let dbItemsGlobal = [];

const items=[
{id:1,name:'Sony wireless headphones',type:'Found',location:'Central Library',date:'6 Oct 2026',category:'Electronics',desc:'Black Sony over-ear wireless headphones, found near the study desks on the second floor of Central Library. They appear to be in good condition.',img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'},
{id:2,name:'Blue water bottle',type:'Lost',location:'Sports Centre',date:'6 Oct 2026',category:'Personal items',desc:'Blue insulated water bottle with a black lid. Last seen near the indoor courts at the Sports Centre.',img:'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80'},
{id:3,name:'Keys with a green tag',type:'Found',location:'Student Union',date:'5 Oct 2026',category:'Personal items',desc:'A small set of keys attached to a green fabric tag.',img:'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=80'},
{id:4,name:'Beige canvas backpack',type:'Lost',location:'Engineering Building',date:'5 Oct 2026',category:'Bags',desc:'Beige canvas backpack, last seen around the Engineering Building.',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'},
{id:5,name:'Round reading glasses',type:'Found',location:'Arts Building',date:'4 Oct 2026',category:'Accessories',desc:'Round frame reading glasses found near the Arts Building.',img:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80'},
{id:6,name:'Black lecture notebook',type:'Found',location:'Central Library',date:'4 Oct 2026',category:'Study items',desc:'Black notebook left on a library table.',img:'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80'}];

let user=localStorage.getItem('unifindUser')||'';let reports=JSON.parse(localStorage.getItem('unifindReports')||'[]');let claims=JSON.parse(localStorage.getItem('unifindClaims')||'[]');let uploadedImage='';

const safeImg=(url)=>url?url.replace('photo-150居','photo-1505740420928-5e560c06d30e'):'';
const app=document.querySelector('#app');

function toast(s){const t=document.querySelector('#toast');t.textContent=s;t.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.style.display='none',3000)}

function card(i){return `<article class="card"><div class="item-visual" style="--item-bg:url('${safeImg(i.img)}')"><img class="item-photo" src="${safeImg(i.img)}" alt="${i.name}" onerror="this.src='https://placehold.co/600x400/eaf1fb/2459d3?text=Item+Photo'"></div><div class="cardbody"><span class="badge ${i.type.toLowerCase()}">${i.type}</span><h3>${i.name}</h3><div class="meta location-meta"><span class="location-icon" aria-hidden="true">📍</span> ${i.location}</div><div class="cardbottom"><span>${i.date}</span><a class="mini-btn" href="#item/${i.id}">View</a></div></div></article>`}

function headerProfile(){const el=document.querySelector('#profileLink');if(el){el.textContent=user?'Logout':'Login';el.href=user?'#logout':'#login'}}

function home(){return `<section class="hero"><div class="container hero-layout"><div class="hero-copy"><div class="eyebrow">Your campus. Your community.</div><h1>Find what you lost.<br>Return what you found.</h1><p>UniFind connects lost belongings with the people who miss them. Report an item, search campus finds, and help it get home.</p><div class="actions"><a class="btn" href="#report?type=Lost">Report Lost Item</a><a class="btn secondary" href="#report?type=Found">Report Found Item</a></div><form class="searchbox" onsubmit="event.preventDefault();location.hash='#browse?q='+encodeURIComponent(this.q.value)"><input name="q" placeholder="⌕  Search for a lost or found item…"><button class="btn">Search</button></form><div class="hint">Try “headphones”, “keys” or a campus location.</div></div><aside class="hero-side" aria-label="UniFind features"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-feature-main"><span class="hero-feature-icon">⌕</span><div><strong>Find it faster</strong><small>Search items across your campus</small></div></div><div class="hero-feature-chip chip-top"><span>📍</span><div><b>Campus locations</b><small>Find where it was reported</small></div></div><div class="hero-feature-chip chip-bottom"><span>✦</span><div><b>Smart matching</b><small>Connect similar lost & found items</small></div></div><div class="hero-mini-label">LOST  <i>↔</i>  FOUND</div></aside></div></section><section class="section container"><div class="sectionhead"><h2>Recent Items</h2><a class="textlink" href="#browse">View all →</a></div>
<div class="grid" id="recentGrid">Loading recent items...</div>
<div class="callout"><div><h3>Found something? A quick report could make someone’s day.</h3><p>Help a fellow student get their belongings back.</p></div><a class="btn" href="#report?type=Found">Report an item</a></div></section><section class="section container" id="how"><div class="how-intro"><span class="eyebrow">Simple, safe and community-powered</span><h2>How UniFind Works</h2><p>From reporting an item to returning it to its owner, follow five simple steps.</p></div><div class="steps how-steps">${[['01','Report an item','Tell the campus community what you lost or found.','✎'],['02','Browse listings','Search reports by item name, category or location.','⌕'],['03','Find a match','Review visually similar items and compare details.','✧'],['04','Submit a claim','Share private details to help verify ownership.','✓'],['05','Return safely','Arrange a handover in a staffed public place.','↗']].map(s=>`<article class="how-card"><div class="how-icon">${s[3]}</div><span class="how-number">${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join('')}</div><div class="callout ai-callout"><div><span class="eyebrow">Smart discovery</span><h3>✧ &nbsp; AI Image Matching</h3><p>Use an item photo to explore visually similar listings. Matches are suggestions only and do not verify ownership.</p></div><a class="btn secondary" href="#matches">Explore image matching</a></div></section>`}

function browse(){let hash=location.hash;let params=new URLSearchParams(hash.split('?')[1]||'');let q=params.get('q')||'';return `<section class="container"><div class="pagehead"><h1>Lost & Found</h1><p>A small search can bring something important back.</p></div><form class="searchbox" id="browseSearch"><input name="q" value="${esc(q)}" placeholder="Search for a lost or found item…"><button class="btn">Search</button></form><div class="filters"><div class="segmented"><button class="active" data-type="All">All items</button><button data-type="Lost">Lost</button><button data-type="Found">Found</button></div><select id="category"><option>All categories</option>${[...new Set(items.map(i=>i.category))].map(c=>`<option>${c}</option>`).join('')}</select><select id="location"><option>All locations</option>${[...new Set(items.map(i=>i.location))].map(c=>`<option>${c}</option>`).join('')}</select></div><div class="countrow"><span id="itemCount">Loading items...</span><span>Newest first</span></div><div id="browseGrid" class="grid three"></div><div id="noResults" class="empty hidden"><h2>No items found</h2><p>Try a broader name or check back after new items are reported.</p><button class="btn secondary" onclick="location.hash='#browse'">Clear search</button> <a class="btn" href="#report">Report Lost Item</a></div></section>`}

function report(){let p=new URLSearchParams(location.hash.split('?')[1]||'');let type=p.get('type')||'Lost';return `<section class="container"><div class="pagehead"><h1>Report Item</h1><p>Lost something or found something? Let your campus know.</p></div><div class="formlayout"><form class="panel" id="reportForm"><h2>What would you like to report?</h2><div class="formrow radiochoices"><label><input type="radio" name="type" value="Lost" ${type==='Lost'?'checked':''}> I lost an item</label><label><input type="radio" name="type" value="Found" ${type==='Found'?'checked':''}> I found an item</label></div><div class="formrow"><label>Item photo <span class="optional-label">(optional · 1 image only)</span></label><div class="uploadbox"><span class="upload-symbol">＋</span><strong>Upload one clear item photo</strong><small>JPG, PNG or WEBP · Choose a single image</small><input type="file" accept="image/png,image/jpeg,image/webp" id="photoUpload" name="img"></div><div class="preview-row"><img id="photoPreview" class="hidden" alt="Photo preview"><button type="button" id="removePhoto" class="remove-photo hidden">Remove image</button></div></div><div class="formrow"><label>Item name *</label><input name="name" required placeholder="e.g. Blue water bottle"></div><div class="formrow"><label>Category *</label><select name="category" required><option value="">Choose a category</option><option>Electronics</option><option>Personal items</option><option>Bags</option><option>Accessories</option><option>Study items</option><option>Other</option></select></div><div class="formrow"><label>Last seen / found location *</label><select name="location" required><option value="">Choose a campus location</option>${['Central Library','Sports Centre','Student Union','Engineering Building','Arts Building','Cafeteria','Lecture Hall','Other'].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="formrow"><label>Date lost / found *</label><input type="date" name="date" required value="2026-10-06"></div><div class="formrow"><label>Description *</label><textarea name="desc" required placeholder="Describe the item and where it was last seen..."></textarea></div><p class="hint">Keep one or two unique details private so you can confirm ownership later.</p><div class="actions"><button class="btn">Submit report</button><a class="btn secondary" href="#home">Cancel</a></div></form><aside><div class="notice"><h3>A little detail goes a long way</h3><p>Use a clear item name, the closest campus location, and the date you last saw or found it.</p></div><div class="notice"><h3>Protect personal details</h3><p>Don’t include student IDs, phone numbers, addresses, or valuable identifying details in your public report.</p></div><div class="notice green"><h3>After you report</h3><p>Check possible image matches, then follow your report and notifications in My Activity.</p></div></aside></div></section>`}

// View Item Page (Delete Button added here)
function itemPage(id){
    // Checks database items first, then falls back to default items
    let i=[...dbItemsGlobal, ...items,...reports].find(x=>x.id==id)||items[0];
    return `<section class="container"><div class="pagehead"><a class="textlink" href="#browse">← Lost & Found</a></div><div class="detailgrid"><div><img class="detailimage" src="${safeImg(i.img||'')}" alt="${i.name}" onerror="this.src='https://placehold.co/800x600/eaf1fb/2459d3?text=Item+Photo'"><p class="hint">Photo provided by the student who ${i.type==='Found'?'found':'reported'} this item.</p></div><div><span class="badge ${i.type.toLowerCase()}">${i.type}</span><h1>${i.name}</h1><div class="meta location-meta"><span class="location-icon" aria-hidden="true">📍</span> ${i.location}</div><div class="meta">▣ ${i.type} on ${i.date}</div><div class="meta">◇ ${i.category||'Personal items'}</div><h3>About this item</h3><p>${i.desc}</p><button class="btn" onclick="location.hash='#claim/${i.id}'">Claim Item</button> <button class="btn secondary" style="background-color: #ffebee; color: #c62828; margin-top: 10px;" onclick="deleteItem('${i.id}')">Delete Item</button><p class="hint">Think this is yours? Share a few private identifying details to help the finder confirm.</p></div></div><div class="notice"><h3>◈ A safe return starts with a little care</h3><p>Keep identifying details private. Once your claim is confirmed, arrange a handover at the campus help desk or another staffed public place.</p></div><div class="countrow"><span>Report UF-${1042+i.id} · Posted ${i.date}</span><a href="#activity" class="textlink">Need help?</a></div></section>`
}

function claim(id){let i=[...dbItemsGlobal, ...items,...reports].find(x=>x.id==id)||items[0];return `<section class="container"><div class="pagehead"><a class="textlink" href="#item/${i.id}">← Back to item</a><h1 style="margin-top:12px">Claim Item</h1><p>Help the finder confirm that this item belongs to you.</p></div><div class="formlayout"><form class="panel" id="claimForm"><div class="notice"><h3>Your answers are private</h3><p>Only the person reviewing this claim will see your identifying details. They won’t appear on the public listing.</p></div><div class="formrow"><label>Your name *</label><input name="name" required value="${esc(user)}" placeholder="Your full name"></div><div class="formrow"><label>University email *</label><input type="email" name="email" required placeholder="you@university.edu"></div><div class="formrow"><label>How can you identify this item? *</label><textarea name="identify" required placeholder="Mention a mark, accessory, or detail that isn’t visible in the listing."></textarea></div><div class="formrow"><label>Where and when did you lose it? *</label><textarea name="where" required placeholder="Add the location and approximate time."></textarea></div><div class="formrow"><label><input type="checkbox" required style="width:auto"> I confirm this item is mine and the details above are accurate.</label></div><button class="btn">Submit claim</button> <a class="btn secondary" href="#item/${i.id}">Cancel</a></form><aside><article class="card"><img class="item-photo" src="${safeImg(i.img)}" alt="${i.name}"><div class="cardbody"><span class="badge ${i.type.toLowerCase()}">${i.type}</span><h3>${i.name}</h3><p class="meta">${i.location} · ${i.date}</p></div></article><h3>What happens next?</h3><p class="meta">The finder checks your details. You’ll get a notification when there’s an update. Once confirmed, meet at the campus help desk or a staffed public place. Never pay a fee to recover your item.</p></aside></div></section>`}

function activity(){return `<section class="container"><div class="pagehead"><h1>My Activity</h1><p>Your reports, claims and campus updates, all in one place.</p></div>${!user?`<div class="notice">Sign in to keep track of reports and claims. <a class="textlink" href="#login">Login →</a></div>`:''}<div class="notice green"><h3>Your campus activity</h3><p>Your reports and claims are saved in this browser for this demo.</p></div><div class="activitygrid"><div><div class="sectionhead"><h2>My Reports</h2><span class="meta">${reports.length} active</span></div>${reports.length?reports.map(i=>`<div class="activityitem"><img src="${safeImg(i.img||'')}" onerror="this.src='https://placehold.co/100x80/eaf1fb/2459d3?text=Item'"><div><span class="badge ${i.type.toLowerCase()}">${i.type}</span><h3>${i.name}</h3><p>${i.location} · ${i.date}</p><a class="textlink" href="#item/${i.id}">View report →</a></div></div>`).join(''):'<p class="meta">You haven’t submitted any reports yet.</p>'}</div><div><div class="sectionhead"><h2>Notifications</h2><span class="meta">Updates</span></div><div class="activityitem"><div>◉</div><div><h3>Welcome to UniFind</h3><p>Report an item or browse recent campus listings.</p></div></div>${claims.map(c=>`<div class="activityitem"><div>◈</div><div><h3>Claim submitted</h3><p>Your claim for ${c.itemName} is awaiting review.</p></div></div>`).join('')}<div class="callout"><div><h3>Need help finding an item?</h3><p>Try visually similar image matches.</p></div><a class="btn secondary" href="#matches">Find matches</a></div></div></div></section>`}

function matches(){return `<section class="container matches-page"><div class="pagehead"><span class="eyebrow">Smart item discovery</span><h1>AI Image Matching</h1><p>Upload a photo of your item and explore listings that look similar.</p></div><div class="match-layout"><div class="panel match-upload-panel"><div class="match-heading"><div class="how-icon">✧</div><div><h2>Upload an item photo</h2><p>Choose one clear image to compare with campus listings.</p></div></div><label class="match-drop" for="matchUpload"><span class="upload-symbol">＋</span><strong>Choose an image</strong><small>JPG, PNG or WEBP</small><input id="matchUpload" type="file" accept="image/jpeg,image/png,image/webp"></label><p class="hint">For best results, use a well-lit photo with the item clearly visible.</p><button class="btn" id="runMatch">Find similar items</button></div><aside class="notice match-note"><h3>How matching helps</h3><p>Image matching can help you discover listings with a similar appearance. Always compare the location, date and private identifying details before making a claim.</p><div class="match-note-icon">⌕</div></aside></div><div class="sectionhead match-results-head"><div><span class="eyebrow">Explore listings</span><h2>Possible matches</h2></div><span class="meta">Sample visual results</span></div><div class="grid three">${[items[0],items[4],items[2]].map(i=>`<article class="card">${card(i).replace('<article class="card">','').replace('</article>','').replace('<div class="cardbottom">','<div class="match-tag">Suggested visual match</div><div class="cardbottom">')}</article>`).join('')}</div><p class="hint match-disclaimer">Note: these are demonstration suggestions. A real AI image-matching service is not connected yet.</p></section>`}
function login(){const mode=location.hash.slice(1).split('?')[0]==='register'?'register':location.hash.slice(1).split('?')[0]==='forgot'?'forgot':'login';return `<section class="container auth-container" style="max-width:500px;padding-top:34px;padding-bottom:42px"><div class="panel auth-panel"><div class="eyebrow">Welcome to UniFind</div><h1 style="font-size:28px">${mode==='register'?'Create your UniFind account':mode==='forgot'?'Reset your password':'Sign in to UniFind'}</h1><p class="meta">${mode==='register'?'Create an account to report lost items, make claims and track campus updates.':mode==='forgot'?'For this prototype, reset access to a demo account in this browser.':'Use the email and password you registered with.'}</p><form id="${mode==='register'?'registerForm':mode==='forgot'?'forgotForm':'loginForm'}">${mode==='register'?`<div class="formrow"><label>Full name *</label><input name="name" required autocomplete="name" placeholder="Your full name"></div>`:''}<div class="formrow"><label>University email *</label><input name="email" type="email" required autocomplete="email" placeholder="your.name@university.edu"></div>${mode!=='forgot'?`<div class="formrow"><label>Password *</label><input name="password" type="password" required minlength="8" autocomplete="${mode==='register'?'new-password':'current-password'}" placeholder="At least 8 characters"></div>`:''}${mode==='register'?`<div class="formrow"><label>Confirm password *</label><input name="confirmPassword" type="password" required minlength="8" autocomplete="new-password" placeholder="Enter password again"></div>`:''}${mode==='forgot'?`<div class="formrow"><label>New password *</label><input name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters"></div><p class="hint">Please enter your registered email and a new password.</p>`:''}<button class="btn">${mode==='register'?'Create account':mode==='forgot'?'Reset password':'Login'}</button></form>${mode==='login'?`<p><a class="textlink" href="#forgot">Forgot password?</a></p>`:''}<p>${mode==='register'?'Already have an account?':mode==='forgot'?'Remembered your password?':'New to UniFind?'} <a class="textlink" href="#${mode==='register'?'login':mode==='forgot'?'login':'register'}">${mode==='register'?'Login':mode==='forgot'?'Back to login':'Create an account'}</a></p><a href="#browse" class="textlink">Continue browsing without signing in</a></div></section>`}

function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function render(){const h=location.hash.slice(1)||'home';if(h==='logout'){user='';localStorage.removeItem('unifindUser');localStorage.removeItem('unifindEmail');sessionStorage.removeItem('unifindSession');location.hash='#home';return}headerProfile();const [path,arg]=h.split('/');if(path.startsWith('browse'))app.innerHTML=browse();else if(path==='home')app.innerHTML=home();else if(path==='report')app.innerHTML=report();else if(path==='item')app.innerHTML=itemPage(arg);else if(path==='claim')app.innerHTML=claim(arg);else if(path==='activity')app.innerHTML=activity();else if(path==='matches')app.innerHTML=matches();else if(path==='login'||path==='register'||path==='forgot')app.innerHTML=login();else app.innerHTML=home();bind();window.scrollTo(0,0)}

// Delete Item Function
async function deleteItem(id) {
    if(confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
        try {
            let formData = new FormData();
            formData.append('id', id);

            const response = await fetch('delete.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.text();

            if(result.includes("Successful")) {
                toast('Item deleted successfully!');
                location.hash = '#browse'; 
                setTimeout(() => location.reload(), 1000); 
            } else {
                toast(result);
            }
        } catch(err) {
            toast("Server Error: Unable to delete the item.");
            console.error("Delete Error:", err);
        }
    }
}

function bind(){
    // Fetch Recent Items from Database for Home Page
    const recentGrid = document.querySelector('#recentGrid');
    if (recentGrid) {
        fetch('search.php?query=')
            .then(res => res.json())
            .then(dbItems => {
                dbItemsGlobal = dbItems; // Save data to global variable
                if(dbItems.length > 0) {
                    recentGrid.innerHTML = dbItems.slice(0, 4).map(card).join('');
                } else {
                    recentGrid.innerHTML = items.slice(0, 4).map(card).join(''); // Show default items if DB is empty
                }
            })
            .catch(err => {
                console.error("Home Page Fetch Error: ", err);
                recentGrid.innerHTML = items.slice(0, 4).map(card).join(''); // Show default items if an error occurs
            });
    }

    // Browse Page Search
    const bf=document.querySelector('#browseSearch');
    if(bf)bf.addEventListener('submit',e=>{e.preventDefault();location.hash='#browse?q='+encodeURIComponent(bf.q.value)});
    
    if(document.querySelector('#browseGrid')){
        let active='All';
        
        const apply = async () => {
            let q = new URLSearchParams(location.hash.split('?')[1]||'').get('q')||'';
            let cat = document.querySelector('#category').value;
            let loc = document.querySelector('#location').value;
            
            try {
                const response = await fetch('search.php?query=' + encodeURIComponent(q));
                let dbItems = await response.json();
                dbItemsGlobal = dbItems; // Update global variable

                let list = dbItems.filter(i => 
                    (active === 'All' || i.type === active) &&
                    (cat === 'All categories' || i.category === cat) &&
                    (loc === 'All locations' || i.location === loc)
                );

                document.querySelector('#browseGrid').innerHTML = list.map(card).join('');
                document.querySelector('#itemCount').textContent = `${list.length} item${list.length===1?'':'s'} found`;
                document.querySelector('#noResults').classList.toggle('hidden', !!list.length);
                document.querySelector('#browseGrid').classList.toggle('hidden', !list.length);
            } catch (err) {
                console.error("Search Error:", err);
                toast('Error retrieving data from the database.');
            }
        };

        document.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-type]').forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.type;apply()}));
        ['category','location'].forEach(id=>document.querySelector('#'+id).addEventListener('change',apply));
        apply();
    }

    const pu=document.querySelector('#photoUpload');
    if(pu)pu.addEventListener('change',()=>{
        const f=pu.files && pu.files[0];
        const im=document.querySelector('#photoPreview');
        const remove=document.querySelector('#removePhoto');
        if(f){
            if(!['image/jpeg','image/png','image/webp'].includes(f.type)){toast('Please choose a JPG, PNG or WEBP image.');pu.value='';return;}
            if(f.size>5*1024*1024){toast('Image must be smaller than 5 MB.');pu.value='';return;}
            uploadedImage=URL.createObjectURL(f);
            im.src=uploadedImage;im.classList.remove('hidden');remove?.classList.remove('hidden');
        }
    });
    const removePhoto=document.querySelector('#removePhoto');
    if(removePhoto)removePhoto.addEventListener('click',()=>{
        if(pu)pu.value='';
        const im=document.querySelector('#photoPreview');
        if(im){im.src='';im.classList.add('hidden');}
        removePhoto.classList.add('hidden');
        if(uploadedImage)URL.revokeObjectURL(uploadedImage);
        uploadedImage='';
    });

    // Submit Report Item
    const rf=document.querySelector('#reportForm');
    if(rf) rf.addEventListener('submit', async e => {
        e.preventDefault();
        const f = new FormData(rf);
        try {
            const response = await fetch('report.php', { method: 'POST', body: f });
            const result = await response.text();
            
            if(result.includes("Successful")) {
                toast('Item reported successfully!');
                location.hash = '#browse'; // Redirect to Home page after success
            } else {
                toast('Error: ' + result);
            }
        } catch(err) { toast('Server error occurred.'); }
    });

    const cf=document.querySelector('#claimForm');if(cf)cf.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(cf);claims.push({name:f.get('name'),email:f.get('email'),identify:f.get('identify'),where:f.get('where'),itemName:([ ...dbItemsGlobal,...items,...reports].find(i=>i.id==Number(location.hash.split('/')[1]))||items[0]).name});localStorage.setItem('unifindClaims',JSON.stringify(claims));toast('Claim submitted successfully.');location.hash='#activity'});

    const reg = document.querySelector('#registerForm');
    if(reg) reg.addEventListener('submit', async e => {
        e.preventDefault();
        const f = new FormData(reg);
        const password = String(f.get('password'));
        const confirm = String(f.get('confirmPassword'));
        if(password.length < 8) { toast('Password must be at least 8 characters.'); return; }
        if(password !== confirm) { toast('Passwords do not match.'); return; }
        try {
            const response = await fetch('register.php', { method: 'POST', body: f });
            const result = await response.text();
            if(result.includes("Successful")) { toast('Account created successfully! Please login.'); location.hash = '#login'; } 
            else { toast(result); }
        } catch(err) { toast('Server error occurred.'); }
    });

    const lf = document.querySelector('#loginForm');
    if(lf) lf.addEventListener('submit', async e => {
        e.preventDefault();
        const f = new FormData(lf);
        try {
            const response = await fetch('login.php', { method: 'POST', body: f });
            const result = await response.text();
            if(result.includes("Successful")) {
                user = f.get('email');
                localStorage.setItem('unifindUser', user);
                sessionStorage.setItem('unifindSession', 'active');
                toast('Login successful!'); location.hash = '#activity'; headerProfile();
            } else { toast(result); }
        } catch(err) { toast('Server error occurred.'); }
    });

    // Reset Password Form 
    const ff = document.querySelector('#forgotForm');
    if (ff) ff.addEventListener('submit', async e => {
        e.preventDefault();
        const f = new FormData(ff);
        const password = String(f.get('password'));

        if (password.length < 8) { 
            toast('Password must be at least 8 characters.'); 
            return; 
        }

        try {
            const response = await fetch('reset.php', { method: 'POST', body: f });
            const result = await response.text();
            
            if (result.includes("Successful")) {
                toast('Password reset successfully. Please login.');
                location.hash = '#login';
            } else {
                toast(result);
            }
        } catch(err) { 
            toast('Server error occurred.'); 
        }
    });

    const mu=document.querySelector('#matchUpload');if(mu)mu.addEventListener('change',()=>{if(mu.files[0])toast('Photo selected. Click Find image matches to view demo results.')});const rm=document.querySelector('#runMatch');if(rm)rm.addEventListener('click',()=>toast('Showing visually similar demo items below.'))
}

window.addEventListener('hashchange',render);render();

document.addEventListener('DOMContentLoaded', function () {
  const candidates = [ document.querySelector('header'), document.querySelector('.topbar'), document.querySelector('.navbar'), document.querySelector('.site-header'), document.querySelector('.main-header'), document.querySelector('nav') ].filter(Boolean);
  const nav = candidates.find(el => /UniFind/i.test(el.textContent || '') && /Home/i.test(el.textContent || '') && /Lost\s*&?\s*Found/i.test(el.textContent || '') ) || candidates[0];
  if (nav) { nav.style.position = 'sticky'; nav.style.top = '0'; nav.style.zIndex = '10000'; nav.style.width = '100%'; nav.style.backgroundColor = '#FFFFFF'; }
});

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.topbar');
  if (!nav) return;
  function syncNavHeight() {
    const h = Math.ceil(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--unifind-nav-height', h + 'px');
  }
  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);
});