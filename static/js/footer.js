document.querySelectorAll('footer li').forEach(li => {
  const link = li.querySelector('a[href*="x.com"]');
  if (link) {
    const img = document.createElement('img');
    img.src = 'https://abs.twimg.com/favicons/twitter.3.ico';
    img.alt = 'X (Twitter)';
    img.style.cssText = 'width:16px;height:16px;vertical-align:middle;margin-right:6px;border-radius:3px;';
    link.prepend(img);
  }
});
