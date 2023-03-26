import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AnimatedCardImage } from '../../Components/AnimatedCardImage';
import { Button } from '../../Components/Button';
import { Footer } from '../../Components/Footer';
import { Header } from '../../Components/Header';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { useCart } from '../../contexts/CartContext';
import { useComics } from '../../contexts/ComicsContext';
import * as Styled from './styles';

export const Comic: React.FC = () => {
  const { comicId } = useParams<{ comicId: string }>();

  const { comic, loadOneComic } = useComics();
  const { addToCart } = useCart();

  useEffect(() => {
    if (comicId) {
      loadOneComic(comicId);
    }
  }, [comicId, loadOneComic]);

  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <>
      {!comic?.results && <LoadingSpinner isOutTheButton />}
      {comic.results && (
        <>
          <Header />
          <Styled.ComicContainer
            background={`${comic.results[0].thumbnail.path}.${comic?.results[0].thumbnail.extension}`}
          >
            <Styled.ComicContainerImage>
              <AnimatedCardImage
                thumbnail={comic.results[0].thumbnail}
                title={comic.results[0].title}
              />

              <Button
                text="Add to cart"
                onClick={() => addToCart(comic.results[0])}
              />
            </Styled.ComicContainerImage>

            <Styled.ComicContainerDescription>
              <h2>{comic.results[0].title.toUpperCase()}</h2>
              <Styled.SubTitleContainer>
                <h3>Description:</h3>
                <p>
                  {comic.results[0].description ??
                    'The comic has no description.'}
                </p>
              </Styled.SubTitleContainer>

              <Styled.SubTitleContainer>
                <h3>Creators:</h3>
                <p>
                  {comic.results[0].creators.items.map(
                    (creator, index) =>
                      `${creator.name}${
                        index + 1 === comic.results[0].creators.items.length
                          ? '.'
                          : ', '
                      }`
                  )}
                </p>
              </Styled.SubTitleContainer>

              <Styled.SubTitleContainer>
                <h3>Characters:</h3>
                <p>
                  {comic.results[0].characters.available
                    ? comic.results[0].characters.items.map(
                        (character, index) =>
                          `${character.name}${
                            index + 1 ===
                            comic.results[0].characters.items.length
                              ? '.'
                              : ', '
                          }`
                      )
                    : 'No information about characters.'}
                </p>
              </Styled.SubTitleContainer>

              <Styled.SubTitleContainer>
                <h3>Price:</h3>
                <p>
                  {numberFormatter.format(comic.results[0].prices[0].price)}
                </p>
              </Styled.SubTitleContainer>
            </Styled.ComicContainerDescription>
          </Styled.ComicContainer>
          <Footer />
        </>
      )}
    </>
  );
};
