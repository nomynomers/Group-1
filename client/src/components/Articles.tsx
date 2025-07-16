import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Articles: FC = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/articles');
  };

  const articles = [
    {
      id: 1,
      title: "Understanding the Importance of Regular Health Check-ups",
      date: "March 15, 2024",
      category: "Preventive Care",
      readTime: "5 min read",
      image: "https://placehold.co/600x400"
    },
    {
      id: 2,
      title: "The Role of Nutrition in Mental Health",
      date: "March 12, 2024",
      category: "Mental Health",
      readTime: "7 min read",
      image: "https://placehold.co/600x400"
    },
    {
      id: 3,
      title: "Exercise Tips for Busy Professionals",
      date: "March 10, 2024",
      category: "Fitness",
      readTime: "4 min read",
      image: "https://placehold.co/600x400"
    }
  ];

  return (
    <div style={{
      padding: '6rem 2rem 4rem', // ✅ Increased top padding to prevent overlap
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#272b69',
          marginBottom: '2rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Latest Articles
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '1rem'
        }}>
          {articles.map((article, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#272b69',
                    fontWeight: '500',
                    backgroundColor: '#f0f1ff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px'
                  }}>
                    {article.category}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {article.readTime}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#272b69',
                  margin: '0 0 0.75rem',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>
                  {article.title}
                </h3>

                <Link
                  to={`/articles/${article.id}`}
                  style={{
                    marginTop: '1rem',
                    display: 'inline-block',
                    color: '#272b69',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    textDecoration: 'underline'
                  }}
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            to="/articles"
            onClick={handleViewAllClick}
            style={{
              backgroundColor: '#272b69',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1f2254';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#272b69';
            }}
          >
            View All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
