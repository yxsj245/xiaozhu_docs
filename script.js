// 生成主类别
const mainCategories = document.getElementById('main-categories');
Object.keys(categories).forEach(mainCategory => {
    const categoryItem = document.createElement('div');
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = mainCategory;
    categoryItem.appendChild(categoryTitle);

    const list = document.createElement('ul');
    categories[mainCategory].forEach(subCategory => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = subCategory.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadMarkdown(subCategory.file);
        });
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    categoryItem.appendChild(list);
    mainCategories.appendChild(categoryItem);
});

// 加载并显示Markdown文件
function loadMarkdown(file) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            document.getElementById('markdown-content').innerHTML = marked.parse(text);
            document.getElementById('directory').style.display = 'none';
            document.getElementById('markdown-content').style.display = 'block';
            document.getElementById('back-button').style.display = 'block';
            document.getElementById('back-to-main').style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading markdown file:', error);
            document.getElementById('markdown-content').innerText = '无法加载Markdown文件。';
        });
}

// 显示子类别
function showSubCategories(mainCategory) {
    const subList = document.getElementById('sub-list');
    subList.innerHTML = ''; // 清空子类别列表

    categories[mainCategory].forEach(subCategory => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = subCategory.title;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadMarkdown(subCategory.file);
        });
        listItem.appendChild(link);
        subList.appendChild(listItem);
    });

    document.getElementById('main-categories').style.display = 'none';
    document.getElementById('sub-categories').style.display = 'block';
    document.getElementById('back-to-main').style.display = 'block';
}

// 返回主类别
document.getElementById('back-to-main').addEventListener('click', () => {
    document.getElementById('main-categories').style.display = 'block';
    document.getElementById('sub-categories').style.display = 'none';
    document.getElementById('back-to-main').style.display = 'none';
});

// 返回目录
document.getElementById('back-button').addEventListener('click', () => {
    document.getElementById('directory').style.display = 'block';
    document.getElementById('markdown-content').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('main-categories').style.display = 'block';
    document.getElementById('sub-categories').style.display = 'none';
    document.getElementById('back-to-main').style.display = 'none';
});