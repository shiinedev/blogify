import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'
import {  getArticlesById } from '../lib/Articles'
import { FiCalendar } from 'react-icons/fi'
import CommentSection from '../components/CommentSection'


const ArticleDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchArticle = async () => {
      try {

        if (!id) return
        setLoading(true)

        const article = await getArticlesById(id);

        console.log('article info', article)

        setArticle(article)


      } catch (error) {
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle();
  }, [id, , user])



  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';

    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date format error';
    }
  }




  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }


  if (!article) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Article not found</h2>
        <p className="mt-2 text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/articles" className="mt-4 inline-block text-blue-600 hover:underline">
          Browse all articles
        </Link>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Image */}

      {article.feature_image && (
        <div className="relative w-full h-[60vh] bg-gray-900">
          <img
            src={article.feature_image}
            alt={article.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
      )}

      <div className={`relative ${article.feature_image ? '-mt-32' : 'pt-10'}`}>
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="px-6 py-10 md:px-12">
            {/* tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/tags/${tag}`}
                  className="inline-block bg-orange-50 text-orange-600 text-sm px-3 py-1 rounded-full hover:bg-orange-100 transition-colors duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* author */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
              <div className="flex items-center space-x-4">
                <img
                  src={article.author.avatar_url || 'https://via.placeholder.com/40'}
                  alt={article.author.username}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <Link
                    to={`/profile/${article.author.username}`}
                    className="text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    {article.author.username}
                  </Link>

                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* article content */}
          <div className="px-6 md:px-12 pb-10">

            <div
              className="prose prose-lg prose-rose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

          </div>

        </article>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto mt-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <div className="px-6 md:px-12 py-8">
              <CommentSection articleId={id} />
            </div>
          </div>
        </div>
        
      </div>

    </div>
  )

}

export default ArticleDetails





  