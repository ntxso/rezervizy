import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

// 3 noktalı animasyon oluşturmak için keyframes kullanalım
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
`;

const LoadingText = styled.div`
  font-size: 24px;
  font-weight: bold;
  animation: ${dotAnimation} 1.5s infinite;
`;

const LoadingModal = () => {
  const isLoading=useSelector((state)=>state.generalReducer.loading);
  return (
    <>
      {isLoading && (
        <LoadingModalWrapper>
          <LoadingText>...</LoadingText>
        </LoadingModalWrapper>
      )}
    </>
  );
};

export default LoadingModal;

// const TestModal = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Örneğin, bir API isteği gibi uzun süren bir işlemi simüle etmek için setTimeout kullanalım
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       {/* Diğer sayfa içeriği */}
//       <p>Diğer içerik...</p>

//       {/* LoadingModal'ı görüntüleme durumunu kontrol etmek için loading state'ini kullanalım */}
//       <LoadingModal isOpen={loading} />
//     </div>
//   );
// };

// export default TestModal;

