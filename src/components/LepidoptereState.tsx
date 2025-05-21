// Interface pour les états du lépidoptère
export interface ILepidoptereState {
  name: string;
  description: string;
  behavior: string;
  nextState: string | null;
  imagePath: string;
}

// Classe abstraite pour les états
export abstract class LepidoptereState implements ILepidoptereState {
  name: string;
  description: string;
  behavior: string;
  nextState: string | null;
  imagePath: string;

  constructor(name: string, description: string, behavior: string, nextState: string | null, imagePath: string) {
    this.name = name;
    this.description = description;
    this.behavior = behavior;
    this.nextState = nextState;
    this.imagePath = imagePath;
  }
}

// État concret: Chenille
export class ChenilleState extends LepidoptereState {
  constructor() {
    super(
      "Chenille",
      "Premier stade du lépidoptère après l'éclosion de l'œuf",
      "Se nourrit intensément de feuilles pour accumuler des réserves",
      "Chrysalide",
      "/images/chenille.png"
    );
  }
}

// État concret: Chrysalide
export class ChrysalideState extends LepidoptereState {
  constructor() {
    super(
      "Chrysalide",
      "Stade intermédiaire où se produit la métamorphose",
      "Reste immobile dans un cocon pendant que les tissus se réorganisent",
      "Papillon",
      "/images/chrysalide.png"
    );
  }
}

// État concret: Papillon
export class PapillonState extends LepidoptereState {
  constructor() {
    super(
      "Papillon",
      "Stade adulte du lépidoptère",
      "Vole de fleur en fleur pour se nourrir de nectar et se reproduire",
      null,
      "/images/papillon.png"
    );
  }
}

// Classe contexte qui gère l'état courant
export class Lepidoptere {
  private state: LepidoptereState;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.state = new ChenilleState();
  }

  // Getter pour l'état courant
  getState(): LepidoptereState {
    return this.state;
  }

  // Getter pour le nom
  getName(): string {
    return this.name;
  }

  // Méthode pour changer d'état
  evolve(): boolean {
    if (this.state.nextState === "Chrysalide") {
      this.state = new ChrysalideState();
      return true;
    } else if (this.state.nextState === "Papillon") {
      this.state = new PapillonState();
      return true;
    }
    return false; // Pas d'évolution possible (état final)
  }
}

// Fonction pour créer une instance de lépidoptère
export function createLepidoptere(name: string): Lepidoptere {
  return new Lepidoptere(name);
}
