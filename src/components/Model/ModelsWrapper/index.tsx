import React, { useCallback, useRef, useState } from 'react';

import ModelsContext, { CarModel } from '../ModelsContext';

import ModelOverlay from '../ModelOverlay';
import { Container, OverlaysRoot } from './styles';

const ModelsWrapper: React.FC = ( {children} ) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [registeredModels, setRegisterModels] = useState<CarModel[]>([])

  const registerModel = useCallback((model: CarModel) => {
    setRegisterModels(state => [...state, model])
  }, [])

  const unregisterModel = useCallback((modelName: string) => {
    setRegisterModels(state => state.filter(model => model.modelName !== modelName))
  }, [])

  const getModelByName = useCallback((modelName: string) => {
    return registeredModels.find(item => item.modelName === modelName) || null
  }, [registeredModels])
  
  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName
      }}
    >
      <Container ref={wrapperRef}>
        <OverlaysRoot>
          {registeredModels.map(items => (
            <ModelOverlay key={items.modelName} model={items}>
              {items.overlayNode}
              </ModelOverlay>
          ))}
        </OverlaysRoot>
        
        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
