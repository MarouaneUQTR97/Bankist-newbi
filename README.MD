# Documentation Git , Document serie INF1001

## Initialisation du depo

```Bash
Git init
Git remote add origin_SSH_REPO
```

## Rédiger un commit

```

Titre du commit

Desctiption de notre commit avec des informations sur l'évolution du projet

```

## Envoyer un commut sur le dépot distant

```Bash
git add
git commit -m " Titre du commit "
git push origin master
```

## Creation d'une branche

```Bash
git chekout -b NOM_BRANCHE


```

Pour les bonnes pratique , on va integrer la motion de revu de code .

Ceci est juste pour un test

…or create a new repository on the command line
echo "# INF1001" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:MarouaneUQTR97/INF1001.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin git@github.com:MarouaneUQTR97/INF1001.git
git branch -M main
git push -u origin main```
