import { useState } from 'react';
import { LepidoptereState, ChenilleState, ChrysalideState, PapillonState } from './LepidoptereState';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, RefreshCcw } from 'lucide-react';

const LepidoptereVisualizer: React.FC = () => {
  // Utiliser un état pour suivre le stade actuel (0: chenille, 1: chrysalide, 2: papillon)
  const [stade, setStade] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  
  // Créer l'état approprié en fonction du stade
  const getStateFromStade = (stadeNum: number): LepidoptereState => {
    switch(stadeNum) {
      case 0:
        return new ChenilleState();
      case 1:
        return new ChrysalideState();
      case 2:
        return new PapillonState();
      default:
        return new ChenilleState();
    }
  };
  
  // Obtenir l'état actuel
  const currentState = getStateFromStade(stade);
  
  // Fonction pour évoluer vers l'état suivant
  const handleEvolve = () => {
    if (stade < 2) { // Si ce n'est pas encore le stade final
      setAnimating(true);
      
      // Délai pour l'animation
      setTimeout(() => {
        setStade(prevStade => prevStade + 1);
        setAnimating(false);
      }, 1500);
    }
  };
  
  // Fonction pour réinitialiser à l'état initial
  const handleReset = () => {
    setStade(0);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-green-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Métamorphose du Lépidoptère</h1>
      
      <div className="w-full max-w-4xl">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`rounded-full p-3 ${stade === 0 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
              Chenille
            </div>
            <ArrowRight className="text-gray-400" />
            <div className={`rounded-full p-3 ${stade === 1 ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}>
              Chrysalide
            </div>
            <ArrowRight className="text-gray-400" />
            <div className={`rounded-full p-3 ${stade === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              Papillon
            </div>
          </div>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{currentState.name}</CardTitle>
            <CardDescription>{currentState.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-64 h-64 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden transition-all duration-1000 ${animating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
                {/* Images réelles pour chaque état */}
                {stade === 0 && (
                  <img src="/images/chenille.png" alt="Chenille" className="max-w-full max-h-full object-contain" />
                )}
                {stade === 1 && (
                  <img src="/images/chrysalide.png" alt="Chrysalide" className="max-w-full max-h-full object-contain" />
                )}
                {stade === 2 && (
                  <img src="/images/papillon.png" alt="Papillon" className="max-w-full max-h-full object-contain" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Comportement</h3>
                <p className="mb-4">{currentState.behavior}</p>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Pattern État (State Pattern)</h4>
                  <p className="text-sm text-gray-700">
                    Ce modèle permet à un objet de modifier son comportement lorsque son état interne change.
                    Ici, le lépidoptère change de comportement en passant par différents états de son cycle de vie.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" /> Réinitialiser
            </Button>
            <Button 
              onClick={handleEvolve} 
              disabled={stade >= 2 || animating}
              className="flex items-center gap-2"
            >
              {animating ? 'Métamorphose en cours...' : 'Évoluer'}
              {!animating && <ArrowRight className="h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">À propos du Pattern État</h2>
          <p className="mb-4">
            Le pattern État est un modèle de conception comportemental qui permet à un objet de modifier son comportement lorsque son état interne change.
            Ce modèle est particulièrement adapté pour représenter la métamorphose du lépidoptère, car chaque stade (chenille, chrysalide, papillon) 
            possède des comportements spécifiques et des règles de transition claires.
          </p>
          
          <img 
            src="/images/metamorphosis.png" 
            alt="Cycle de métamorphose complet" 
            className="w-full max-w-lg mx-auto my-6 rounded-lg shadow-sm"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Chenille</h3>
              <p className="text-sm">Se nourrit de feuilles et grandit rapidement avant de former un cocon.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Chrysalide</h3>
              <p className="text-sm">État de transformation où l'organisme se réorganise complètement.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Papillon</h3>
              <p className="text-sm">État final capable de voler et de se reproduire.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LepidoptereVisualizer;
