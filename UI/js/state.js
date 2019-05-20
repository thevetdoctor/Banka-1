const stateLocal = [
  {
    state: {
      name: 'Abia State',
      id: 1,
      locals: [
        {
          name: 'Aba South',
          id: 1
        },
        {
          name: 'Arochukwu',
          id: 2
        },
        {
          name: 'Bende',
          id: 3
        },
        {
          name: 'Ikwuano',
          id: 4
        },
        {
          name: 'Isiala Ngwa North',
          id: 5
        },
        {
          name: 'Isiala Ngwa South',
          id: 6
        },
        {
          name: 'Isuikwuato',
          id: 7
        },
        {
          name: 'Obi Ngwa',
          id: 8
        },
        {
          name: 'Ohafia',
          id: 9
        },
        {
          name: 'Osisioma',
          id: 10
        },
        {
          name: 'Ugwunagbo',
          id: 11
        },
        {
          name: 'Ukwa East',
          id: 12
        },
        {
          name: 'Ukwa West',
          id: 13
        },
        {
          name: 'Umuahia North',
          id: 14
        },
        {
          name: 'Umuahia South',
          id: 15
        },
        {
          name: 'Umu Nneochi',
          id: 16
        }
      ]
    }
  },
  {
    state: {
      name: 'Adamawa State',
      id: 2,
      locals: [
        {
          name: 'Fufure',
          id: 1
        },
        {
          name: 'Ganye',
          id: 2
        },
        {
          name: 'Gayuk',
          id: 3
        },
        {
          name: 'Gombi',
          id: 4
        },
        {
          name: 'Grie',
          id: 5
        },
        {
          name: 'Hong',
          id: 6
        },
        {
          name: 'Jada',
          id: 7
        },
        {
          name: 'Lamurde',
          id: 8
        },
        {
          name: 'Madagali',
          id: 9
        },
        {
          name: 'Maiha',
          id: 10
        },
        {
          name: 'Mayo Belwa',
          id: 11
        },
        {
          name: 'Michika',
          id: 12
        },
        {
          name: 'Mubi North',
          id: 13
        },
        {
          name: 'Mubi South',
          id: 14
        },
        {
          name: 'Numan',
          id: 15
        },
        {
          name: 'Shelleng',
          id: 16
        },
        {
          name: 'Song',
          id: 17
        },
        {
          name: 'Toungo',
          id: 18
        },
        {
          name: 'Yola North',
          id: 19
        },
        {
          name: 'Yola South',
          id: 20
        }
      ]
    }
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const stateSel = document.querySelector('#stateSel');
  const lgaSel = document.querySelector('#lgaSel');
  const lgaDiv = document.querySelector('.BB__lga');
  lgaDiv.style.display = 'none';
  // Load States
  for (const state in stateLocal) {
    const newState = stateLocal[state].state;
    stateSel.options[stateSel.options.length] = new Option(newState.name, newState.id);
  }

  stateSel.addEventListener('change', (e) => {
    lgaSel.length = 1;

    lgaDiv.style.display = 'block';

    const stateAndLocal = stateLocal.filter(lga => lga.state.id == e.target.value);

    const lgas = stateAndLocal[0].state.locals;
    lgas.map((lga) => {
      lgaSel.options[lgaSel.options.length] = new Option(lga.name, lga.id);
    });
  });
});
