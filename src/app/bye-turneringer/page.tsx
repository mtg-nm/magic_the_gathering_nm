import { getByeTournamentInfo, getNavigation } from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function ByeTournamentPage() {
  const navigation = await getNavigation();
  const byeTournamentInfo = await getByeTournamentInfo();

  const normalizedSlug = 'bye-turneringer';

  return (
    <>
      <Header navigation={navigation} normalizedSlug={normalizedSlug} />

      <main className="main-content">
        {Array.isArray(byeTournamentInfo) && byeTournamentInfo.length > 0 ? (
          <section className="page-section">
            <div className="container">
              <div className="section-header">
                <h2>Bye-turneringer</h2>
                <p>Siste sjanse til å vinne bye til Norgesmesterskapet</p>
              </div>

              <div className="grid-2">
                {byeTournamentInfo.map((item: any) => {
                  const deltakere = item.fields?.deltakere ? String(item.fields.deltakere) : null;
                  const rulesv2 = item.fields?.rulesv2 ? String(item.fields.rulesv2) : null;

                  return (
                    <div key={item.sys.id} className="card">
                      <h3 className="card-title">
                        {String(item.fields?.title || 'Unavngitt turnering')}
                      </h3>
                      {item.fields?.description && (
                        <p className="card-description">
                          {String(item.fields.description)}
                        </p>
                      )}
                      <div className="event-specs">
                        {item.fields?.format && (
                          <div className="spec">
                            <div className="spec-label">Format</div>
                            <div className="spec-value">{String(item.fields.format)}</div>
                          </div>
                        )}
                        {item.fields?.rounds && (
                          <div className="spec">
                            <div className="spec-label">Runder</div>
                            <div className="spec-value">{String(item.fields.rounds)}</div>
                          </div>
                        )}
                        {deltakere && (
                          <div className="spec">
                            <div className="spec-label">Deltakere</div>
                            <div className="spec-value">{deltakere}</div>
                          </div>
                        )}
                        {rulesv2 && (
                          <div className="spec">
                            <div className="spec-label">Regler</div>
                            <div className="spec-value">{rulesv2}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          <section className="page-section">
            <div className="container">
              <div style={{ 
                padding: '40px', 
                backgroundColor: 'var(--box-primary)',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <p>Ingen bye-turneringer funnet.</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}