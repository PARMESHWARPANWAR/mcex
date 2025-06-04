'use client'
import type { Metadata } from 'next';
import ChallengeGrid from '@/components/Challenge/ChallengeGrid';
import { tutorials } from '@/data/multi-modal-tutorails';
// ----------------------------------------------------------------------

// export const metadata: Metadata = {
//   title: 'Multi Modal Tutorials',
//   description:
//     'Multi Modal Tutorials',
// };

export default function MultimodalTutorails() {
  return (
    <>
      <ChallengeGrid
        challenges={tutorials}
        title="🎯 Multimodal AI Learning Path"
        subtitle="Master ImageBind and multimodal search from basics to production"
      />

      <div className="learning-path-info">
        <div className="info-card">
          <h3>📚 Progressive Learning</h3>
          <p>Each tutorial builds upon the previous ones, creating a complete multimodal search system by the end.</p>
        </div>
        <div className="info-card">
          <h3>🛠️ Hands-On Practice</h3>
          <p>Every challenge includes practical code examples, exercises, and real-world implementations.</p>
        </div>
        <div className="info-card">
          <h3>🚀 Production Ready</h3>
          <p>Learn not just the concepts, but how to deploy and scale multimodal AI systems in production.</p>
        </div>
      </div>

      <style jsx>{`
        .learning-path-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 60px;
        }
        
        .info-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 25px;
          border-left: 4px solid #4ecdc4;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-3px);
        }
        
        .info-card h3 {
          margin-top: 0;
          color: #4ecdc4;
          font-size: 1.3em;
        }
        
        .info-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 0;
        }
      `}</style>

    </>

  );
}


