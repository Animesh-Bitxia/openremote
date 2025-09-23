/*
 * Copyright 2024, BKT Tyres
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.openremote.model.asset.impl;

import org.openremote.model.asset.Asset;
import org.openremote.model.asset.AssetDescriptor;
import org.openremote.model.attribute.MetaItem;
import org.openremote.model.value.AttributeDescriptor;
import org.openremote.model.value.MetaItemType;
import org.openremote.model.value.ValueConstraint;
import org.openremote.model.value.ValueType;

import jakarta.persistence.Entity;
import java.util.Optional;

import static org.openremote.model.Constants.*;

/**
 * BKT Enterprise asset representing the main enterprise/organization level
 */
@Entity
public class BKTEnterpriseAsset extends Asset<BKTEnterpriseAsset> {

    public static final AssetDescriptor<BKTEnterpriseAsset> DESCRIPTOR = new AssetDescriptor<>("img:bkt-enterprise", "1E88E5", BKTEnterpriseAsset.class);

    public static final AttributeDescriptor<Integer> TOTAL_FACTORIES = new AttributeDescriptor<>("totalFactories", ValueType.POSITIVE_INTEGER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Integer> TOTAL_MACHINES = new AttributeDescriptor<>("totalMachines", ValueType.POSITIVE_INTEGER,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    public static final AttributeDescriptor<Double> OVERALL_EFFICIENCY = new AttributeDescriptor<>("overallEfficiency", ValueType.POSITIVE_NUMBER,
        new MetaItem<>(MetaItemType.LABEL, "Overall Efficiency"),
        new MetaItem<>(MetaItemType.READ_ONLY)
    ).withUnits(UNITS_PERCENTAGE).withConstraints(new ValueConstraint.Min(0), new ValueConstraint.Max(100));

    public static final AttributeDescriptor<String> REGION = new AttributeDescriptor<>("region", ValueType.TEXT,
        new MetaItem<>(MetaItemType.READ_ONLY)
    );

    /**
     * For use by hydrators (i.e. JPA/Jackson)
     */
    protected BKTEnterpriseAsset() {
    }

    public BKTEnterpriseAsset(String name) {
        super(name);
    }

    public Optional<Integer> getTotalFactories() {
        return getAttributes().getValue(TOTAL_FACTORIES);
    }

    public Optional<Integer> getTotalMachines() {
        return getAttributes().getValue(TOTAL_MACHINES);
    }

    public Optional<Double> getOverallEfficiency() {
        return getAttributes().getValue(OVERALL_EFFICIENCY);
    }

    public Optional<String> getRegion() {
        return getAttributes().getValue(REGION);
    }
}
