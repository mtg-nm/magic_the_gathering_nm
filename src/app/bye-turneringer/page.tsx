import { getByeTournamentInfoSection, getByeEvemt, getNavigation } from '@/lib/contentful';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function ByeTournamentPage() {
  try {
    const navigation = await getNavigation();
    const byeTournamentInfoSections = await getByeTournamentInfoSection();
    const byeEvemts = await getByeEvemt();

    const normalizedSlug = 'bye-turneringer';

    console.log('byeTournamentInfoSections:', byeTournamentInfoSections);
    console.log('byeEvemts:', byeEvemts);

    // Sorter events etter dato
    const sortedByeEvemts = Array.isArray(byeEvemts)
      ? [...byeEvemts].sort((a, b) => {
          const dateA = new Date(String(a.fields?.eventStartTime) || '0').getTime();
          const dateB = new Date(String(b.fields?.eventStartTime) || '0').getTime();
          return dateA - dateB;
        })
      : [];

    return (
      <>
        <Header navigation={navigation} normalizedSlug={normalizedSlug} />

        <main className="main-content">
          {/* BYE TOURNAMENT INFO SECTIONS - Grønne bokser under hverandre */}
          {Array.isArray(byeTournamentInfoSections) && byeTournamentInfoSections.length > 0 && (
            <section className="page-section">
              <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                  {byeTournamentInfoSections.map((section: any) => (
                    <div key={section.sys.id} className="content-box-green">
                      <h3 style={{
                        color: '#9effc0',
                        marginBottom: '15px',
                        fontSize: '1.2em'
                      }}>
                        {section.fields?.icon || '📌'} {String(section.fields?.title || 'Info')}
                      </h3>

                      {section.fields?.descriptionByes && (
                        <div style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.95em',
                          lineHeight: '1.6'
                        }}>
                          {typeof section.fields.descriptionByes === 'string' ? (
                            <p style={{ margin: '0' }}>
                              {section.fields.descriptionByes}
                            </p>
                          ) : section.fields.descriptionByes?.content ? (
                            <div>
                              {section.fields.descriptionByes.content.map((block: any, idx: number) => {
                                // Håndter paragraf blokker
                                if (block.nodeType === 'paragraph') {
                                  return (
                                    <p key={idx} style={{ margin: '0 0 12px 0' }}>
                                      {block.content?.map((text: any, textIdx: number) => (
                                        <span key={textIdx}>
                                          {text.marks?.some((m: any) => m.type === 'bold') ? (
                                            <strong>{text.value}</strong>
                                          ) : text.marks?.some((m: any) => m.type === 'italic') ? (
                                            <em>{text.value}</em>
                                          ) : (
                                            text.value
                                          )}
                                        </span>
                                      ))}
                                    </p>
                                  );
                                }

                                // Håndter lister
                                if (block.nodeType === 'unordered-list' || block.nodeType === 'ordered-list') {
                                  return (
                                    <ul key={idx} style={{
                                      margin: '0 0 12px 0',
                                      paddingLeft: '20px'
                                    }}>
                                      {block.content?.map((listItem: any, listIdx: number) => (
                                        <li key={listIdx} style={{ margin: '4px 0' }}>
                                          {listItem.content?.[0]?.content?.[0]?.value}
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                }

                                return null;
                              })}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* BYE EVENTS - Blå bokser ved siden av hverandre */}
          {Array.isArray(byeEvemts) && byeEvemts.length > 0 ? (
            <section className="page-section">
              <div className="container">
                <div className="grid-2">
                  {sortedByeEvemts.map((event: any) => {
                    const eventName = event.fields?.eventName ? String(event.fields.eventName) : 'Unavngitt turnering';
                    const eventDescription = event.fields?.eventDescription && typeof event.fields.eventDescription === 'string' 
                      ? event.fields.eventDescription 
                      : null;
                    const eventStartTime = event.fields?.eventStartTime ? String(event.fields.eventStartTime) : null;
                    const eventLocation = event.fields?.eventLocation ? String(event.fields.eventLocation) : null;
                    const format = event.fields?.format ? String(event.fields.format) : null;
                    const registrationUrl = event.fields?.registrationUrl ? String(event.fields.registrationUrl) : null;

                    return (
                      <div 
                        key={event.sys.id} 
                        className="card"
                      >
                        <h3 className="card-title">
                          {eventName}
                        </h3>

                        {eventDescription && (
                          <p className="card-description">
                            {eventDescription}
                          </p>
                        )}

                        <div className="event-specs">
                          {eventStartTime && (
                            <div className="spec">
                              <div className="spec-label">Dato & Tid</div>
                              <div className="spec-value">
                                {new Date(eventStartTime).toLocaleDateString('no-NO', {
                                  weekday: 'short',
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>
                          )}
                          {eventLocation && (
                            <div className="spec">
                              <div className="spec-label">Lokasjon</div>
                              <div className="spec-value">{eventLocation}</div>
                            </div>
                          )}
                          {format && (
                            <div className="spec">
                              <div className="spec-label">Format</div>
                              <div className="spec-value">{format}</div>
                            </div>
                          )}
                        </div>

                        {registrationUrl && (
                          <a 
                            href={registrationUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ width: '100%', textAlign: 'center', marginTop: '20px', display: 'block' }}
                          >
                            Påmelding
                          </a>
                        )}
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
                  <p>❌ Ingen bye-turneringer funnet.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading bye-turneringer page:', error);

    return (
      <>
        <Header navigation={[]} normalizedSlug="bye-turneringer" />
        <main className="main-content">
          <section className="page-section">
            <div className="container">
              <div style={{
                padding: '40px',
                backgroundColor: 'var(--box-primary)',
                borderRadius: '8px',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <p>Det oppstod en feil ved lasting av siden. Vennligst prøv igjen senere.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}