import { getPages, getNavigation } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const pages = await getPages();
    const navigation = await getNavigation();

    const normalizedSlug = slug.toLowerCase().trim();

    // Filtrer bort fullt-program og bye-turneringer
    if (normalizedSlug === 'fullt-program' || normalizedSlug === 'bye-turneringer') {
      notFound();
    }

    const page = pages.find((p: any) => 
      p.fields?.slug?.toLowerCase().trim() === normalizedSlug
    ) as any;

    if (!page) {
      notFound();
    }

    return (
      <>
        <Header navigation={navigation} normalizedSlug={normalizedSlug} />

        <main className="main-content">
          {page?.fields?.heroSection && (
            <section className="page-section">
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                  <h1 style={{ 
                    fontSize: '3em', 
                    fontWeight: '700', 
                    color: 'var(--text-light)', 
                    marginBottom: '20px', 
                    lineHeight: '1.1' 
                  }}>
                    {String(page?.fields?.heroSection?.fields?.title || page?.fields?.title)}
                  </h1>
                  {page?.fields?.heroSection?.fields?.subtitle && (
                    <p style={{ 
                      fontSize: '1.2em', 
                      color: 'var(--text-muted)', 
                      maxWidth: '700px', 
                      margin: '0 auto 40px' 
                    }}>
                      {String(page?.fields?.heroSection?.fields?.subtitle)}
                    </p>
                  )}
                  {(page?.fields?.heroSection?.fields?.primaryButtonText || page?.fields?.heroSection?.fields?.secondaryButtonText) && (
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {page?.fields?.heroSection?.fields?.primaryButtonText && (
                        <a 
                          href={page?.fields?.heroSection?.fields?.primaryButtonLink || '#'} 
                          className="btn btn-primary"
                        >
                          {String(page?.fields?.heroSection?.fields?.primaryButtonText)}
                        </a>
                      )}
                      {page?.fields?.heroSection?.fields?.secondaryButtonText && (
                        <a 
                          href={page?.fields?.heroSection?.fields?.secondaryButtonLink || '#'} 
                          className="btn btn-secondary"
                        >
                          {String(page?.fields?.heroSection?.fields?.secondaryButtonText)}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {page?.fields?.description && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  fontSize: '1.1em', 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {String(page?.fields?.description)}
                </div>
              </div>
            </section>
          )}

          {page?.fields?.content && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8',
                  fontSize: '1.05em',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  {String(page?.fields?.content)}
                </div>
              </div>
            </section>
          )}

          {(page?.fields?.rulesv2 || page?.fields?.deltakere) && (
            <section className="page-section">
              <div className="container">
                <div className="event-specs">
                  {page?.fields?.rulesv2 && (
                    <div className="spec">
                      <div className="spec-label">Regler</div>
                      <div className="spec-value">{String(page?.fields?.rulesv2)}</div>
                    </div>
                  )}
                  {page?.fields?.deltakere && (
                    <div className="spec">
                      <div className="spec-label">Deltakere</div>
                      <div className="spec-value">{String(page?.fields?.deltakere)}</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {!page?.fields?.heroSection && 
            !page?.fields?.description && 
            !page?.fields?.content && 
            !page?.fields?.rulesv2 &&
            !page?.fields?.deltakere && (
            <section className="page-section">
              <div className="container">
                <div style={{ 
                  padding: '40px', 
                  backgroundColor: 'var(--box-primary)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>Denne siden har ikke noe innhold ennå.</p>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}