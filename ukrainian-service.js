(function(plugin) {
    plugin.id = "ukrainian-service";
    plugin.version = "1.0.0";
    plugin.name = "Ukrainian Service";

    plugin.create = function() {
        // Функція для додавання сайту
        function addSite(name, url, searchPath, itemSelector, titleSelector, linkSelector) {
            Lampa.Component.add('online', {
                name: name,
                url: url,
                fetch: function(searchQuery, callback) {
                    let fullUrl = url + searchPath + encodeURIComponent(searchQuery);

                    fetch(fullUrl)
                        .then(response => response.text())
                        .then(html => {
                            let parser = new DOMParser();
                            let doc = parser.parseFromString(html, "text/html");
                            let items = [];

                            doc.querySelectorAll(itemSelector).forEach(item => {
                                let title = item.querySelector(titleSelector)?.textContent.trim();
                                let link = item.querySelector(linkSelector)?.href;
                                if (title && link) {
                                    items.push({ title: title, link: link });
                                }
                            });

                            callback(items);
                        })
                        .catch(err => console.error('Error fetching data from ' + name, err));
                }
            });
        }

        // Додаємо сайти
        addSite("Eneyida", "https://eneyida.tv", "/search?query=", ".movie-item", ".movie-title", "a");
        addSite("UAKino", "https://uakino.me", "/search?query=", ".item", ".title", "a");
        addSite("UAKino Bay", "https://uakino-bay.net", "/search?q=", ".item-class", ".title-class", "a"); // Змініть селектори на реальні
        addSite("UASerials", "https://uaserials.pro/films", "/search?q=", ".item-class", ".title-class", "a"); // Змініть селектори на реальні
        addSite("UAFix", "https://uafix.net", "/search?q=", ".item-class", ".title-class", "a"); // Змініть селектори на реальні
    };
})(this);