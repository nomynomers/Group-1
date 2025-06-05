import type { FC } from 'react';
import { useEffect } from 'react';

const ArticlesPage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = [
    {
      title: "Understanding the Importance of Regular Health Check-ups",
      date: "March 15, 2024",
      category: "Preventive Care",
      readTime: "5 min read",
      image: "https://placehold.co/600x400",
      excerpt: "Regular health check-ups are crucial for maintaining good health and preventing potential health issues. Learn why they're important and how to make the most of your appointments."
    },
    {
      title: "The Role of Nutrition in Mental Health",
      date: "March 12, 2024",
      category: "Mental Health",
      readTime: "7 min read",
      image: "https://placehold.co/600x400",
      excerpt: "Discover how your diet affects your mental well-being and learn about the key nutrients that support brain health and emotional balance."
    },
    {
      title: "Exercise Tips for Busy Professionals",
      date: "March 10, 2024",
      category: "Fitness",
      readTime: "4 min read",
      image: "https://placehold.co/600x400",
      excerpt: "Struggling to find time for exercise? These practical tips will help you incorporate physical activity into your busy schedule."
    },
    {
      title: "Sleep Hygiene: Tips for Better Rest",
      date: "March 8, 2024",
      category: "Wellness",
      readTime: "6 min read",
      image: "https://placehold.co/600x400",
      excerpt: "Learn about the importance of good sleep hygiene and discover practical strategies to improve your sleep quality."
    },
    {
      title: "Managing Stress in the Digital Age",
      date: "March 5, 2024",
      category: "Mental Health",
      readTime: "8 min read",
      image: "https://placehold.co/600x400",
      excerpt: "Explore effective ways to manage stress in our increasingly digital world and maintain a healthy work-life balance."
    },
    {
      title: "The Benefits of Mindful Eating",
      date: "March 3, 2024",
      category: "Nutrition",
      readTime: "5 min read",
      image: "https://placehold.co/600x400",
      excerpt: "Discover how mindful eating can improve your relationship with food and contribute to better overall health."
    }
  ];

  const categories = ["All", "Preventive Care", "Mental Health", "Fitness", "Wellness", "Nutrition"];

  return (
    <div style={{
      padding: '120px 0 60px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#272b69',
          marginBottom: '2rem',
          fontWeight: '700',
          textAlign: 'center'
        }}>
          Medical Articles
        </h1>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map((category, index) => (
            <button
              key={index}
              style={{
                backgroundColor: category === 'All' ? '#272b69' : 'white',
                color: category === 'All' ? 'white' : '#272b69',
                border: '1px solid #272b69',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (category !== 'All') {
                  e.currentTarget.style.backgroundColor = '#f0f1ff';
                }
              }}
              onMouseOut={(e) => {
                if (category !== 'All') {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {articles.map((article, index) => (
            <div key={index} style={{
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
            }}>
              <img 
                src={article.image} 
                alt={article.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '300px'
              }}>
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
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    margin: '0 0 1rem',
                    lineHeight: '1.5'
                  }}>
                    {article.excerpt}
                  </p>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  margin: 0,
                  paddingTop: '1rem'
                }}>
                  {article.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage; 