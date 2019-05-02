import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import ItemBlogger from './_children/ItemBlogger'
import Pagination from '../../../../resources/components/paginacion_numerica'

@Consumer
class BloggersList extends Component {
  render() {
    const test = [
      {
        urlImage:
          'https://blogs.gestion.pe/atalayaeconomica/wp-content/uploads/sites/131/2017/11/37-Blog-Atalaya-Económica.jpg',
        date: '29/04/2019',
        blogTitle: 'Atalaya Económica ',
        author: 'Manuel Romero Caro ',
        postTitle: 'Venganza y esperanza 30.04.19 ',
        urlPost:
          '/blog/atalayaeconomica/2019/04/venganza-y-esperanza-30-04-19.html',
        urlBlog: '/blog/atalayaeconomica',
      },
      {
        urlImage: '',
        date: '29/04/2019',
        blogTitle: 'Atalaya Económica ',
        author: 'Manuel Romero Caro ',
        postTitle: 'Venganza y esperanza 30.04.19 ',
        urlPost:
          '/blog/atalayaeconomica/2019/04/venganza-y-esperanza-30-04-19.html',
        urlBlog: '/blog/atalayaeconomica',
      },
      {
        urlImage:
          'https://blogs.gestion.pe/atalayaeconomica/wp-content/uploads/sites/131/2017/11/37-Blog-Atalaya-Económica.jpg',
        date: '29/04/2019',
        blogTitle: 'Atalaya Económica ',
        author: 'Manuel Romero Caro ',
        postTitle: 'Venganza y esperanza 30.04.19 ',
        urlPost:
          '/blog/atalayaeconomica/2019/04/venganza-y-esperanza-30-04-19.html',
        urlBlog: '/blog/atalayaeconomica',
      },
    ]

    return (
      <div className="blog-list">
        <h1 className="blog-list__title">blogs</h1>
        <div className="blog-list__container">
          {test.map((item, index) => {
            const params = item
            return <ItemBlogger key={index} {...params} />
          })}
        </div>
      </div>
    )
  }
}

export default BloggersList
