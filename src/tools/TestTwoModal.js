import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const dotAnimation = keyframes`
  0%, 20% {
    color: #333;
    text-shadow: .25em 0 0 currentColor, .5em 0 0 currentColor;
  }
  40% {
    color: #555;
    text-shadow: .25em 0 0 currentColor, .5em 0 0 currentColor;
  }
  60% {
    text-shadow: .25em 0 0 #333, .5em 0 0 currentColor;
  }
  80%, 100% {
    text-shadow: .25em 0 0 #555, .5em 0 0 #333;
  }
`;

const LoadingModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingText = styled.div`
  font-size: 24px;
  font-weight: bold;
  animation: ${dotAnimation} 1.5s infinite;
`;

const LoadingModal = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <LoadingModalWrapper>
          <LoadingText>Yükleniyor...</LoadingText>
        </LoadingModalWrapper>
      )}
    </>
  );
};

const Col1 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '200px', height: '200px', position: 'relative' }}>
      {/* Diğer bileşen içeriği */}
      <p>Component1 içeriği...</p>

      {/* LoadingModal'ı görüntüleme durumunu kontrol etmek için loading state'ini kullanalım */}
      <LoadingModal isOpen={loading} />
    </div>
  );
};

const Col2 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '200px', height: '200px', position: 'relative' }}>
      {/* Diğer bileşen içeriği */}
      <p>Component2 içeriği...</p>

      {/* LoadingModal'ı görüntüleme durumunu kontrol etmek için loading state'ini kullanalım */}
      <LoadingModal isOpen={loading} />
    </div>
  );
};

const Row = ({ children }) => {
  return <div style={{ display: 'flex' }}>{children}</div>;
};

const TestTwoModal = () => {
  return (
    <div>
      <Row>
        <Col1 />
        <Col2 />
      </Row>
    </div>
  );
};

export default TestTwoModal;
