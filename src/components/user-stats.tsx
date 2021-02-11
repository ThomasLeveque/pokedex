import React from 'react';
import { Grid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';

import { User } from '@data-types/user.type';
import { Document } from '@libs/firebase/firebase-types';

const UserStats: React.FC<{ user: Document<User> }> = ({ user }) => {
  return (
    <Grid
      templateColumns={`repeat(${user.starterId ? 2 : 3}, minmax(0, 1fr))`}
      gap={2}
      width="100%"
    >
      <UserStat key="character-name" label="Character's name :" stat={user.character} />
      <UserStat
        key="adventure-beginning"
        label="Adventure beginning :"
        stat={formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
      />
      <UserStat
        key="last-update"
        label="Last adventure update :"
        stat={formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true })}
      />
      <UserStat
        key="starter-met"
        label="The day you met your starter :"
        stat={
          user.chosenStarterDate
            ? formatDistanceToNow(new Date(user.chosenStarterDate), { addSuffix: true })
            : null
        }
      />
      <UserStat
        key="last-time-pokemon"
        label="Last time you have seen a new pokemon :"
        stat={
          user.lastPokemonSeenDate
            ? formatDistanceToNow(new Date(user.lastPokemonSeenDate), { addSuffix: true })
            : null
        }
      />
      <UserStat
        key="last-evolved"
        label="Last time your starter evolved :"
        stat={
          user.starterEvolveDate
            ? formatDistanceToNow(new Date(user.starterEvolveDate), { addSuffix: true })
            : null
        }
      />
    </Grid>
  );
};

const UserStat: React.FC<{ label: string; stat: string | null }> = ({ label, stat }) =>
  stat ? (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{stat}</StatNumber>
    </Stat>
  ) : null;

export default UserStats;
