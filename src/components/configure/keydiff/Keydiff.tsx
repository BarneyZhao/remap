import React from 'react';
import './Keydiff.scss';
import { Button } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { KeydiffActionsType, KeydiffStateType } from './Keydiff.container';
import { IKeymap } from '../../../services/hid/Hid';
import KeycodeKey from '../keycodekey/KeycodeKey.container';
import { genKey, Key } from '../keycodekey/KeyGen';
import { KEYBOARD_LAYOUT_PADDING } from '../keymap/Keymap';

type KeydiffOwnProps = {};

type KeydiffProps = KeydiffOwnProps &
  Partial<KeydiffStateType> &
  Partial<KeydiffActionsType>;

export default class Keydiff extends React.Component<KeydiffProps, {}> {
  constructor(props: KeydiffProps | Readonly<KeydiffProps>) {
    super(props);
  }
  render() {
    const width = this.props.keyboardWidth! + KEYBOARD_LAYOUT_PADDING * 4;
    const origin: IKeymap | null = this.props.keydiff!.origin;
    const destination: IKeymap | null = this.props.keydiff!.destination;
    if (!origin || !destination) {
      return <div className="diff" style={{ width: width }}></div>;
    }
    const labelLang = this.props.labelLang!;
    const origKey: Key = genKey(origin, labelLang);
    const dstKey: Key = genKey(destination, labelLang);

    return (
      <div className="diff" style={{ width: width }}>
        <div className="diff-frame">
          <div className="spacer"></div>
          <div className="key-orig">
            <KeycodeKey value={origKey!} draggable={false} />
          </div>
          <div className="arrow">&gt;</div>
          <div className="key-dest">
            <KeycodeKey value={dstKey!} draggable={false} />
          </div>
          <div className="cancel-button">
            <Button
              size="small"
              color="secondary"
              startIcon={<Clear />}
              onClick={this.props.onClickCancel?.bind(
                this,
                this.props.selectedLayer!,
                this.props.selectedPos!
              )}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
