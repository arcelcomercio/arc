const filterSchema = () => {
  return `
      {
        content_elements{
            headlines {
                basic
            }
        }
        section_name
      }
      `
}

export default filterSchema

// canonical_url
//     taxonomy{
//     sites{
//         additional_properties{
//         original{
//             site_topper{
//             site_logo_image
//             }
//         }
//         }
//     }
//     sections{
//         name
//         path
//     }
//     }
//     subheadlines{
//     basic
//     }



// {
//     sites{
//         additional_properties{
//             original{
//                 site_topper{
//                     site_logo_image
//                 }
//             }
//         }
//     }
// }