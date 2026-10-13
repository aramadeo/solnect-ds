import { useState, type ReactNode } from 'react';
import { Button, type ButtonProps } from './components/Button';
import { IconButton, type IconButtonProps } from './components/IconButton';
import { Input } from './components/Input';
import { SearchInput } from './components/SearchInput';
import { Select } from './components/Select';
import { SelectCategory, SelectOption, SelectOptions } from './components/SelectOptions';
import { TextArea } from './components/TextArea';

const sizes = ['large', 'medium', 'small'] as const;

// Figma Button 세트에 있는 Variant × Type 조합
const buttonStyles = [
  { variant: 'primary', appearance: 'solid' },
  { variant: 'primary', appearance: 'outlined' },
  { variant: 'secondary', appearance: 'solid' },
  { variant: 'secondary', appearance: 'outlined' },
  { variant: 'secondary', appearance: 'ghost' },
  { variant: 'tertiary', appearance: 'solid' },
  { variant: 'danger', appearance: 'solid' },
  { variant: 'danger', appearance: 'outlined' },
] as const;

const iconButtonStyles = [
  { variant: 'primary', appearance: 'solid' },
  { variant: 'primary', appearance: 'outlined' },
  { variant: 'secondary', appearance: 'solid' },
  { variant: 'secondary', appearance: 'outlined' },
  { variant: 'secondary', appearance: 'ghost' },
  { variant: 'tertiary', appearance: 'solid' },
] as const;

const fruits = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'cherry', label: '체리', disabled: true },
  { value: 'grape', label: '포도' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-gap-lg">
      <h2 className="text-heading-xs text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-gap-lg">
      <span className="w-160 shrink-0 text-label-sm-medium text-text-tertiary">{label}</span>
      {children}
    </div>
  );
}

export function App() {
  const [label, setLabel] = useState('버튼명');
  const [withIcon, setWithIcon] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState('');
  const [fruit, setFruit] = useState<string>();

  return (
    <main className="mx-auto flex max-w-720 flex-col gap-gap-xxl px-inline-xxl py-stack-xxl lg:max-w-none">
      <h1 className="text-heading-lg text-text-primary">Solnect DS</h1>

      <div className="flex flex-wrap items-end gap-gap-lg rounded-md bg-surface-subtle p-16">
        <Input label="label" value={label} onChange={(e) => setLabel(e.target.value)} className="w-[240px]" />
        <label className="flex items-center gap-gap-xs text-label-md-medium text-text-secondary">
          <input type="checkbox" checked={withIcon} onChange={(e) => setWithIcon(e.target.checked)} /> icon
        </label>
        <label className="flex items-center gap-gap-xs text-label-md-medium text-text-secondary">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> disabled
        </label>
      </div>

      <Section title="Button">
        {buttonStyles.map((style) => (
          <Row key={`${style.variant}-${style.appearance}`} label={`${style.variant} / ${style.appearance}`}>
            {sizes.map((size) => (
              <Button
                key={size}
                {...(style as ButtonProps)}
                size={size}
                label={label}
                leadingIcon={withIcon ? 'iconArea' : undefined}
                trailingIcon={withIcon ? 'iconArea' : undefined}
                disabled={disabled}
              />
            ))}
          </Row>
        ))}
      </Section>

      <Section title="Icon Button">
        {iconButtonStyles.map((style) => (
          <Row key={`${style.variant}-${style.appearance}`} label={`${style.variant} / ${style.appearance}`}>
            {(['rounded', 'circular'] as const).map((radius) =>
              (['large', 'medium', 'small', 'xsmall'] as const).map((size) => (
                <IconButton
                  key={radius + size}
                  {...(style as IconButtonProps)}
                  size={size}
                  radius={radius}
                  icon="iconArea"
                  aria-label="아이콘 버튼"
                  disabled={disabled}
                />
              ))
            )}
          </Row>
        ))}
      </Section>

      <Section title="Input">
        <div className="grid gap-gap-xl sm:grid-cols-2">
          <Input
            label="라벨명"
            placeholder="텍스트를 입력해 주세요."
            helpText="안내 텍스트 작성 영역입니다."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClear={() => setText('')}
            disabled={disabled}
          />
          <Input
            size="large"
            label="라벨명 (Large)"
            placeholder="텍스트를 입력해 주세요."
            helpText="안내 텍스트 작성 영역입니다."
            disabled={disabled}
          />
          <SearchInput helpText="안내 텍스트 작성 영역입니다." disabled={disabled} />
          <SearchInput defaultValue="검색어" disabled={disabled} />
        </div>
      </Section>

      <Section title="TextArea">
        <TextArea
          label="라벨명"
          placeholder="텍스트를 입력해 주세요."
          helpText="안내 텍스트 작성 영역입니다."
          maxLength={500}
          disabled={disabled}
          className="max-w-720"
        />
      </Section>

      <Section title="Select">
        <div className="grid gap-gap-xl sm:grid-cols-2">
          <Select label="라벨명" options={fruits} value={fruit} onChange={setFruit} disabled={disabled} />
          <Select
            size="large"
            label="카테고리형 (Large)"
            disabled={disabled}
            options={[
              { category: '과일', options: fruits },
              { category: '채소', options: [{ value: 'carrot', label: '당근' }, { value: 'onion', label: '양파' }] },
            ]}
          />
        </div>
        <Row label="Select Options">
          <SelectOptions className="w-[240px]">
            <SelectOption>Menu Item</SelectOption>
            <SelectOption active>Menu Item (Hover)</SelectOption>
            <SelectOption selected>Menu Item (Selected)</SelectOption>
          </SelectOptions>
          <SelectOptions className="w-[240px]">
            <SelectCategory title="Category">
              <SelectOption>Menu Item</SelectOption>
              <SelectOption>Menu Item</SelectOption>
            </SelectCategory>
            <SelectCategory title="Category">
              <SelectOption>Menu Item</SelectOption>
            </SelectCategory>
          </SelectOptions>
        </Row>
      </Section>
    </main>
  );
}
