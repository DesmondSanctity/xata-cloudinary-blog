import { getXataClient } from '../../src/xata.js'

const Posts = [
    {
        title: 'Everything you need to know about Xata APIs and tools.',
        tags: ['dev', 'react'],
        body: '',
        image: 'https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:232129,g_south_west,x_480,y_254,l_text:lwj-title.otf_64_line_spacing_-10:This%20Is%20a%20Post%20With%20an%20Automatically%20Generated%20Social%20Sharing%20Card/w_760,c_fit,co_rgb:232129,g_north_west,x_480,y_445,l_text:lwj-tagline.otf_48:Writing%20blog%20posts%20is%20fun%20when%20the%20robots%20do%20some%20of%20the%20work!/lwj/blog-post-card',
    },
    {
        title: 'Everything you need to know about Xata APIs and tools.',
        tags: ['dev', 'react'],
        body: '',
        image: 'https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:232129,g_south_west,x_480,y_254,l_text:lwj-title.otf_64_line_spacing_-10:This%20Is%20a%20Post%20With%20an%20Automatically%20Generated%20Social%20Sharing%20Card/w_760,c_fit,co_rgb:232129,g_north_west,x_480,y_445,l_text:lwj-tagline.otf_48:Writing%20blog%20posts%20is%20fun%20when%20the%20robots%20do%20some%20of%20the%20work!/lwj/blog-post-card',
    },
    {
        title: 'Everything you need to know about Xata APIs and tools.',
        tags: ['dev', 'react'],
        body: '',
        image: 'https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:232129,g_south_west,x_480,y_254,l_text:lwj-title.otf_64_line_spacing_-10:This%20Is%20a%20Post%20With%20an%20Automatically%20Generated%20Social%20Sharing%20Card/w_760,c_fit,co_rgb:232129,g_north_west,x_480,y_445,l_text:lwj-tagline.otf_48:Writing%20blog%20posts%20is%20fun%20when%20the%20robots%20do%20some%20of%20the%20work!/lwj/blog-post-card',
    },
    {
        title: 'Everything you need to know about Xata APIs and tools.',
        tags: ['dev', 'react'],
        body: '',
        image: 'https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:232129,g_south_west,x_480,y_254,l_text:lwj-title.otf_64_line_spacing_-10:This%20Is%20a%20Post%20With%20an%20Automatically%20Generated%20Social%20Sharing%20Card/w_760,c_fit,co_rgb:232129,g_north_west,x_480,y_445,l_text:lwj-tagline.otf_48:Writing%20blog%20posts%20is%20fun%20when%20the%20robots%20do%20some%20of%20the%20work!/lwj/blog-post-card',
    },
]

const xata = getXataClient()

export default async function createToXata(req, res) {
    await xata.db.posts.create(Posts)
    res.json({
        ok: true,
    })
}