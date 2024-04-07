import re

def get_image_url(entry):
    # Attempt to extract from <media:thumbnail>
    if 'media_thumbnail' in entry:
        return entry['media_thumbnail'][0]['url']

    # Attempt to extract from <media:content>
    if 'media_content' in entry:
        media_content = entry['media_content']
        if isinstance(media_content, list) and len(media_content) > 0:
            if 'url' in media_content[0]:
                return media_content[0]['url']

    # Attempt to extract from <enclosure>
    if 'links' in entry:
        for link in entry['links']:
            if link['type'] in ['image/jpeg', 'image/png'] and 'href' in link:
                return link['href']

    # Extract from <description> if it contains an <img> tag
    if 'summary' in entry or 'description' in entry:
        summary_html = entry.get('summary', '') or entry.get('description', '')
        img_urls = re.findall(r'<img src="(.*?)"', summary_html)
        if img_urls:
            return img_urls[0]

    # Default image URL if no image found
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"

def clean_html(raw_html):
    cleanr = re.compile('<.*?>')  # Regex to find HTML tags
    cleantext = re.sub(cleanr, '', raw_html)  # Replace HTML tags with an empty string
    return cleantext
