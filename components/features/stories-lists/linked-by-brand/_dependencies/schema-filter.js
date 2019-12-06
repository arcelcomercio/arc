export default arcSite => {
    return `
    {
        content_element { 
            headlines { basic }
            promo_items {
                basic { 
                url 
                type
                subtitle
                caption
                resized_urls { 
                    square_l 
                    square_md 
                    square_s 
                } 
                }
                basic_video {
                promo_items {
                    basic { 
                    url 
                    type
                    subtitle
                    caption
                    resized_urls { 
                        square_l 
                        square_md 
                        square_s
        
                    } 
                    }
                }
                }
                basic_gallery {
                promo_items {
                    basic { 
                    url 
                    type
                    subtitle
                    caption
                    resized_urls { 
                        square_l 
                        square_md 
                        square_s
        
                    } 
                    }
                }
                }
            }
            websites {
                ${arcSite} {
                website_url
                }
            }
            website_url
        }
    }`
}
