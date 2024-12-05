document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/blogs/1')
        .then((response) => response.json())
        .then((res) => {
            renderBlogs(res.response);
            renderPaginationRow(res.totalItems, 1);
        })
        .catch((error) => console.error('Error fetching blogs:', error));

    document.getElementById("btnSearch").addEventListener('click', () => {
        var searchTerm = document.getElementById("searchTxt").value;
        filterBlogs(searchTerm);
    })
});

function filterBlogs(searchTerm) {
    fetch(`/api/blogs/${searchTerm}/1`)
        .then((response) => response.json())
        .then((res) => {
            renderBlogs(res.response);
            renderPaginationRow(res.totalItems, 1);
        })
        .catch((error) => console.error('Error fetching blogs:', error));
}

function renderBlogs(blogs) {
    const row = document.getElementById('blogMainContent');
            let cards = '';
            blogs.forEach((blog, index) => {
                cards += `
                    <div class="col s12 m4">
                        <div class="card">

                            <div class="card-image ">
                                <img src="${blog.image}" class="myimg" alt="${blog.title}">
                            </div>
                            <div class="card-content">
                                <h6 class="btitle"><b>${blog.title}</b></h6>
                                
                                <p>${blog.content.substring(0, 100)}...</p>

                            </div>
                           
                            <div class="card-action">
                                <a href="#">Read More</a>
                                 <div class="author-container">
                                        <span class="author">
                                            <span>~ ${blog.author}</span>
                                            <span class="date">( ${blog.date_published.substring(0,10)} )</span>
                                        </span>

                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            row.innerHTML = cards;
}

function renderPaginationRow(total, currentPage) {
    const pagination = document.getElementById("blogPagination");
    let res = '';
    for(i = 0; i < Math.ceil(total/5); i++) {
        res += `<li class="${(i + 1) === currentPage ? 'active' : 'waves-effect'}" onclick="onPageChange(${i+1})"><a href="#!">${i + 1}</a></li>`
    }
    pagination.innerHTML = res;
}

function onPageChange(page) {
    fetch(`/api/blogs/${page}`)
        .then((response) => response.json())
        .then((res) => {
            renderBlogs(res.response);
            renderPaginationRow(res.totalItems, page);
        })
        .catch((error) => console.error('Error fetching blogs:', error));
}