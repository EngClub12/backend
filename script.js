// رابط API الخاص بـ Strapi
const API_URL = 'http://localhost:1337/api/sections/?populate=*'; // غيّر الرابط إذا كنت تعمل على خادم آخر

// دالة لجلب البيانات وعرضها
function fetchAndDisplayArticles() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('content');
      container.innerHTML = ''; // مسح المحتوى القديم

      // عكس ترتيب البيانات
      const reversedData = data.data.reverse();

      // عرض المقالات بالترتيب العكسي
      reversedData.forEach(item => {
        // إنشاء عنصر لكل مقالة
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article'); // إضافة class
        articleDiv.id = `article-${item.id}`; // إضافة id فريد

        // محتوى المقالة مع الوسائط
        articleDiv.innerHTML = `
          <h5>${item.title}</h5>
          <p>${item.description}</p>
          ${item.image.url ? `<img src="${item.image.url}" alt="Image for ${item.title}">` : ''}
          ${item.video.url ? `<a href="${item.video.url}" target="_blank">Watch Video</a>` : ''}
          <p>Created At: ${new Date(item.createdAt).toLocaleString()}</p>
        `;

        // إضافة المقالة إلى الحاوية
        container.appendChild(articleDiv);
      });

      // طباعة معرفات المقالات في الترتيب العكسي
      const ids = reversedData.map(item => item.id);
      console.log('Article IDs in reverse order:', ids);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// استدعاء الدالة لأول مرة
fetchAndDisplayArticles();
