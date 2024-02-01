const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulBlogPost {
          nodes {
            id
            slug
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      result.data.allContentfulBlogPost.nodes.forEach(node => {
        createPage({
          path: node.slug,
          component: require.resolve("./src/templates/blog-post.js"),
          context: {
            slug: node.slug,
          },
          defer: true,
        })
      })
      resolve()
    })
  })
}
